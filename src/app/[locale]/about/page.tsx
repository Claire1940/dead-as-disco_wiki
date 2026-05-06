import Link from 'next/link'
import type { Metadata } from 'next'
import { buildLanguageAlternates } from '@/lib/i18n-utils'
import { type Locale } from '@/i18n/routing'

interface Props {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://dead-as-disco.wiki').replace(/\/$/, '')
  const path = '/about'
  const imageUrl = new URL('/images/hero.webp', siteUrl).toString()
  const title = 'About Dead as Disco Wiki'
  const description = 'About the Dead as Disco Wiki project, editorial scope, and contact channels.'

  return {
    title,
    description,
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale,
      url: locale === 'en' ? `${siteUrl}${path}` : `${siteUrl}/${locale}${path}`,
      siteName: 'Dead as Disco',
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1920,
          height: 1080,
          alt: 'Dead as Disco Wiki',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    alternates: buildLanguageAlternates(path, locale as Locale, siteUrl),
  }
}

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Dead as Disco Wiki</h1>
          <p className="text-slate-300 text-lg mb-2">A community reference for Dead as Disco players</p>
          <p className="text-slate-400 text-sm">Last Updated: May 6, 2026</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>What This Site Is</h2>
            <p>
              Dead as Disco Wiki is an unofficial fan-maintained knowledge base focused on gameplay clarity: beginner
              onboarding, Idol encounters, songs, builds, challenge modes, and update tracking.
            </p>

            <h2>Editorial Scope</h2>
            <ul>
              <li>Gameplay systems, progression, and mechanics explainers</li>
              <li>Idol strategy notes and encounter breakdowns</li>
              <li>Songs, My Music, and Infinite Disco references</li>
              <li>Patch and roadmap monitoring</li>
            </ul>

            <h2>How We Work</h2>
            <p>
              We cross-check public sources before publishing and revise pages as new information appears. If you find an
              issue, please send a correction request with the page URL and evidence.
            </p>

            <h2>Important Disclaimer</h2>
            <p>
              This website is <strong>unofficial</strong>. It is not affiliated with, endorsed by, or sponsored by Brain
              Jar Games, Valve, or any official platform owner.
            </p>

            <h2>Official Project Links</h2>
            <ul>
              <li>
                Official Website:{' '}
                <a href="https://deadasdisco.com/" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  deadasdisco.com
                </a>
              </li>
              <li>
                Steam Store:{' '}
                <a
                  href="https://store.steampowered.com/app/3404260/Dead_as_Disco/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[hsl(var(--nav-theme-light))] hover:underline"
                >
                  Dead as Disco on Steam
                </a>
              </li>
              <li>
                Official Discord:{' '}
                <a href="https://discord.gg/deadasdisco" target="_blank" rel="noopener noreferrer" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                  discord.gg/deadasdisco
                </a>
              </li>
            </ul>

            <h2>Contact</h2>
            <p>
              General inquiries:
              <br />
              <strong>Email:</strong>{' '}
              <a href="mailto:contact@dead-as-disco.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                contact@dead-as-disco.wiki
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 px-4 border-t border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <Link href="/" className="text-[hsl(var(--nav-theme-light))] hover:underline">
            ← Back to Home
          </Link>
        </div>
      </section>
    </div>
  )
}
