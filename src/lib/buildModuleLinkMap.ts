import { getAllContent, CONTENT_TYPES } from '@/lib/content'
import type { Language, ContentItem } from '@/lib/content'

export interface ArticleLink {
  url: string
  title: string
}

export type ModuleLinkMap = Record<string, ArticleLink | null>

interface ArticleWithType extends ContentItem {
  contentType: string
}

// Module sub-field mapping: moduleKey -> { field, nameKey }
const MODULE_FIELDS: Record<string, { field: string; nameKey: string }> = {
  deadAsDiscoBeginnerGuide: { field: 'steps', nameKey: 'title' },
  deadAsDiscoRhythmCombat: { field: 'cards', nameKey: 'name' },
  deadAsDiscoIdols: { field: 'bosses', nameKey: 'name' },
  deadAsDiscoSkillBuilds: { field: 'skills', nameKey: 'name' },
  deadAsDiscoSongs: { field: 'tracks', nameKey: 'name' },
  deadAsDiscoInfiniteDisco: { field: 'modes', nameKey: 'name' },
  deadAsDiscoChallenges: { field: 'challenges', nameKey: 'name' },
  deadAsDiscoCustomization: { field: 'options', nameKey: 'name' },
  lucidBlocksBeginnerGuide: { field: 'steps', nameKey: 'title' },
  lucidBlocksApotheosisCrafting: { field: 'cards', nameKey: 'name' },
  lucidBlocksToolsAndWeapons: { field: 'items', nameKey: 'name' },
  lucidBlocksStorageAndInventory: { field: 'solutions', nameKey: 'name' },
  lucidBlocksQualiaAndBaseBuilding: { field: 'cards', nameKey: 'name' },
  lucidBlocksWorldRegions: { field: 'regions', nameKey: 'name' },
  lucidBlocksCreaturesAndEnemies: { field: 'creatures', nameKey: 'name' },
  lucidBlocksMobilityGear: { field: 'items', nameKey: 'name' },
  lucidBlocksFarmingAndGrowth: { field: 'sections', nameKey: 'name' },
  lucidBlocksBestEarlyUnlocks: { field: 'priorities', nameKey: 'name' },
  lucidBlocksAchievementTracker: { field: 'groups', nameKey: 'name' },
  lucidBlocksSingleplayerAndPlatformFAQ: { field: 'faqs', nameKey: 'question' },
  lucidBlocksSteamDeckAndController: { field: 'faqs', nameKey: 'question' },
  lucidBlocksSettingsAndAccessibility: { field: 'settings', nameKey: 'name' },
  lucidBlocksUpdatesAndPatchNotes: { field: 'entries', nameKey: 'name' },
  lucidBlocksCrashFixAndTroubleshooting: { field: 'steps', nameKey: 'title' },
}

// Extra semantic keywords per module to boost matching for h2 titles
// These supplement the module title text when matching against articles
const MODULE_EXTRA_KEYWORDS: Record<string, string[]> = {
  deadAsDiscoBeginnerGuide: ['beginner', 'rhythm', 'combo', 'progression', 'early skills'],
  deadAsDiscoRhythmCombat: ['rhythm combat', 'music sync', 'perfect dodge', 'combo system', 'idol bosses'],
  deadAsDiscoIdols: ['idols', 'boss', 'patterns', 'mechanics', 'hemlock'],
  deadAsDiscoSkillBuilds: ['skill tree', 'abilities', 'custom builds', 'playstyle', 'movement skills'],
  deadAsDiscoSongs: ['soundtrack', 'custom songs', 'my music', 'bpm', 'steam workshop'],
  deadAsDiscoInfiniteDisco: ['infinite disco', 'endless mode', 'leaderboards', 'difficulty scaling', 'power ups'],
  deadAsDiscoChallenges: ['song challenges', 'combat trials', 'time attacks', 'objectives', 'mastery'],
  deadAsDiscoCustomization: ['customization', 'cosmetics', 'accessibility', 'audio settings', 'visual settings'],
  lucidBlocksBeginnerGuide: ['beginner guide', 'story mode', 'infinite disco', 'my music', 'fan power'],
  lucidBlocksApotheosisCrafting: ['combat guide', 'beat kune do', 'perfect defense', 'idol phases', 'rhythm control'],
  lucidBlocksToolsAndWeapons: ['controls', 'basic attack combo', 'perfect counter', 'takedown', 'windmill kick'],
  lucidBlocksStorageAndInventory: ['release date', 'patch notes', 'roadmap', 'early access', 'known issues'],
  lucidBlocksQualiaAndBaseBuilding: ['boss idols', 'hemlock', 'arora', 'dex', 'prophet'],
  lucidBlocksWorldRegions: ['best skills', 'abilities', 'hearts', 'fever capacity', 'bass invader'],
  lucidBlocksCreaturesAndEnemies: ['story levels', 'walkthrough', 'tutorial', 'idol routes', 'campaign'],
  lucidBlocksMobilityGear: ['infinite disco', 'manual bpm calibration', 'leaderboards', 'song challenges', 'official song runs'],
  lucidBlocksFarmingAndGrowth: ['my music', 'custom songs', 'mp3 import', 'beat offset', 'bpm sync'],
  lucidBlocksBestEarlyUnlocks: ['soundtrack', 'streamer safe mode', 'dlc', 'superfan bundle', 'radio play'],
  lucidBlocksAchievementTracker: ['steam deck', 'setup steps', 'custom song path', 'supported', 'portable play'],
  lucidBlocksSingleplayerAndPlatformFAQ: ['demo', 'price', 'editions', 'bundle', 'early access'],
  lucidBlocksSteamDeckAndController: ['co op', 'multiplayer status', 'singleplayer', 'future plans', 'launch scope'],
  lucidBlocksSettingsAndAccessibility: ['mods', 'custom skins', 'community mod hub', 'roadmap', 'steam guides'],
  lucidBlocksUpdatesAndPatchNotes: ['characters', 'enemies', 'charlie disco', 'harmony corp', 'launch idols'],
  lucidBlocksCrashFixAndTroubleshooting: ['the encore', 'collectibles', 'cosmetics', 'bar restoration', 'memorabilia'],
}

const FILLER_WORDS = ['dead', 'as', 'disco', '2026', '2025', 'complete', 'the', 'and', 'for', 'how', 'with', 'our', 'this', 'your', 'all', 'from', 'learn', 'master']

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function getSignificantTokens(text: string): string[] {
  return normalize(text)
    .split(' ')
    .filter(w => w.length > 2 && !FILLER_WORDS.includes(w))
}

function matchScore(queryText: string, article: ArticleWithType, extraKeywords?: string[]): number {
  const normalizedQuery = normalize(queryText)
  const normalizedTitle = normalize(article.frontmatter.title)
  const normalizedDesc = normalize(article.frontmatter.description || '')
  const normalizedSlug = article.slug.replace(/-/g, ' ').toLowerCase()

  let score = 0

  // Exact phrase match in title (stripped of "Dead as Disco")
  const strippedQuery = normalizedQuery.replace(/dead\s+as\s+disco\s*/g, '').trim()
  const strippedTitle = normalizedTitle.replace(/dead\s+as\s+disco\s*/g, '').trim()
  if (strippedQuery.length > 3 && strippedTitle.includes(strippedQuery)) {
    score += 100
  }

  // Token overlap from query text
  const queryTokens = getSignificantTokens(queryText)
  for (const token of queryTokens) {
    if (normalizedTitle.includes(token)) score += 20
    if (normalizedDesc.includes(token)) score += 5
    if (normalizedSlug.includes(token)) score += 15
  }

  // Extra keywords scoring (for module h2 titles)
  if (extraKeywords) {
    for (const kw of extraKeywords) {
      const normalizedKw = normalize(kw)
      if (normalizedTitle.includes(normalizedKw)) score += 15
      if (normalizedDesc.includes(normalizedKw)) score += 5
      if (normalizedSlug.includes(normalizedKw)) score += 10
    }
  }

  return score
}

function findBestMatch(
  queryText: string,
  articles: ArticleWithType[],
  extraKeywords?: string[],
  threshold = 20,
): ArticleLink | null {
  let bestScore = 0
  let bestArticle: ArticleWithType | null = null

  for (const article of articles) {
    const score = matchScore(queryText, article, extraKeywords)
    if (score > bestScore) {
      bestScore = score
      bestArticle = article
    }
  }

  if (bestScore >= threshold && bestArticle) {
    return {
      url: `/${bestArticle.contentType}/${bestArticle.slug}`,
      title: bestArticle.frontmatter.title,
    }
  }

  return null
}

export async function buildModuleLinkMap(locale: Language): Promise<ModuleLinkMap> {
  // 1. Load all articles across all content types
  const allArticles: ArticleWithType[] = []
  for (const contentType of CONTENT_TYPES) {
    const items = await getAllContent(contentType, locale)
    for (const item of items) {
      allArticles.push({ ...item, contentType })
    }
  }

  // 2. Load module data from en.json (use English for keyword matching)
  const enMessages = (await import('../locales/en.json')).default as any

  const linkMap: ModuleLinkMap = {}

  // 3. For each module, match h2 title and sub-items
  for (const [moduleKey, fieldConfig] of Object.entries(MODULE_FIELDS)) {
    const moduleData = enMessages.modules?.[moduleKey]
    if (!moduleData) continue

    // Match module h2 title (use extra keywords + lower threshold for broader matching)
    const moduleTitle = moduleData.title as string
    if (moduleTitle) {
      const extraKw = MODULE_EXTRA_KEYWORDS[moduleKey] || []
      linkMap[moduleKey] = findBestMatch(moduleTitle, allArticles, extraKw, 15)
    }

    // Match sub-items
    const subItems = moduleData[fieldConfig.field] as any[]
    if (Array.isArray(subItems)) {
      for (let i = 0; i < subItems.length; i++) {
        const itemName = subItems[i]?.[fieldConfig.nameKey] as string
        if (itemName) {
          const key = `${moduleKey}::${fieldConfig.field}::${i}`
          linkMap[key] = findBestMatch(itemName, allArticles)
        }
      }
    }
  }

  return linkMap
}
