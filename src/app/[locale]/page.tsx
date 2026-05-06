import { getLatestArticles } from '@/lib/getLatestArticles'
import { buildModuleLinkMap } from '@/lib/buildModuleLinkMap'
import type { Language } from '@/lib/content'
import type { Metadata } from 'next'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import type { Locale } from '@/i18n/routing'
import HomePageClient from './HomePageClient'

interface PageProps {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://dead-as-disco.wiki').replace(/\/$/, '')
  const pageUrl = locale === 'en' ? siteUrl : `${siteUrl}/${locale}`
  const title = 'Dead as Disco - Guides, Idols, Music & Builds'
  const description =
    'Explore Dead as Disco guides for idols, rhythm combat, skill builds, My Music setup, songs, challenges, cosmetics, updates, and beginner tips.'
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
  const moduleLinkMap = await buildModuleLinkMap(locale as Language)
  const featuredVideoId = 'ipBPeI3bOW0'
  const featuredVideoTitle = 'Dead as Disco - Official Reveal Trailer'

  return (
    <HomePageClient
      latestArticles={latestArticles}
      moduleLinkMap={moduleLinkMap}
      locale={locale}
      featuredVideoId={featuredVideoId}
      featuredVideoTitle={featuredVideoTitle}
    />
  )
}
