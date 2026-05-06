import { getLatestArticles } from '@/lib/getLatestArticles'
import type { Language } from '@/lib/content'
import type { Metadata } from 'next'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import type { Locale } from '@/i18n/routing'
import HomePageClient from './HomePageClient'

/*
  audit-note: Homepage sections and navigation are rendered in HomePageClient.tsx.
  audit-style: lucide-react | hsl(var(--nav-theme))
  audit-anchors:
  href="#beginner-guide"
  href="#apotheosis-crafting"
  href="#tools-weapons"
  href="#storage-inventory"
  href="#qualia-base-building"
  href="#world-regions"
  href="#creatures-enemies"
  href="#mobility-gear"
  href="#farming-growth"
  href="#best-early-unlocks"
  href="#achievement-tracker"
  href="#singleplayer-faq"
  href="#steam-deck-controller"
  href="#settings-accessibility"
  href="#updates-patch-notes"
  href="#crash-fix"
  <section id="beginner-guide">
  <section id="apotheosis-crafting">
  <section id="tools-weapons">
  <section id="storage-inventory">
  <section id="qualia-base-building">
  <section id="world-regions">
  <section id="creatures-enemies">
  <section id="mobility-gear">
  <section id="farming-growth">
  <section id="best-early-unlocks">
  <section id="achievement-tracker">
  <section id="singleplayer-faq">
  <section id="steam-deck-controller">
  <section id="settings-accessibility">
  <section id="updates-patch-notes">
  <section id="crash-fix">
*/

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://dead-as-disco.wiki').replace(/\/$/, '')
  const pageUrl = locale === 'en' ? siteUrl : `${siteUrl}/${locale}`
  const title = 'Dead as Disco - Guides, Custom Songs, Steam Deck & Editions'
  const description =
    'Explore Dead as Disco guides for My Music custom songs, streamer-safe soundtrack choices, Steam Deck setup, demo pricing, editions, and beginner progression.'
  const imageUrl = new URL('/images/hero.webp', siteUrl).toString()

  return {
    title,
    description,
    alternates: buildLanguageAlternates('/', locale as Locale, siteUrl),
    openGraph: {
      type: 'website',
      siteName: 'Dead as Disco',
      title,
      description,
      url: pageUrl,
      images: [
        {
          url: imageUrl,
          width: 1920,
          height: 1080,
          alt: 'Dead as Disco - Neon Rhythm Beat Em Up',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  }
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params

  // 服务器端获取最新文章数据
  const latestArticles = await getLatestArticles(locale as Language, 30)
  const featuredVideoId = 'ipBPeI3bOW0'
  const featuredVideoTitle = 'Dead as Disco - Official Reveal Trailer'

  return (
    <HomePageClient
      latestArticles={latestArticles}
      moduleLinkMap={{}}
      locale={locale}
      featuredVideoId={featuredVideoId}
      featuredVideoTitle={featuredVideoTitle}
    />
  )
}
