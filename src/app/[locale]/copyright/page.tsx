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
  const path = '/copyright'
  const imageUrl = new URL('/images/hero.webp', siteUrl).toString()
  const title = 'Copyright Notice - Dead as Disco Wiki'
  const description = 'Copyright notice and DMCA process for Dead as Disco Wiki.'

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

export default function CopyrightNotice() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Copyright Notice</h1>
          <p className="text-slate-300 text-lg mb-2">Intellectual property and takedown policy</p>
          <p className="text-slate-400 text-sm">Last Updated: May 6, 2026</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>1. Site Content Ownership</h2>
            <p>
              Unless otherwise noted, original textual content and editorial structure on Dead as Disco Wiki are
              protected by copyright.
            </p>

            <h2>2. Third-Party Intellectual Property</h2>
            <p>
              Dead as Disco and related game/platform marks, logos, and assets are owned by their respective rights
              holders. Their appearance on this site is for commentary, reference, and fan documentation.
            </p>

            <h2>3. Limited Use</h2>
            <p>
              You may quote short excerpts for non-commercial purposes with attribution and a link back to the original
              page. Commercial republication requires permission.
            </p>

            <h2>4. DMCA Notice Process</h2>
            <p>
              If you believe material on this site infringes your copyright, send a notice including:
            </p>
            <ul>
              <li>Your name and contact details</li>
              <li>Identification of the copyrighted work</li>
              <li>The specific URL(s) of allegedly infringing material</li>
              <li>A statement of good-faith belief and accuracy under penalty of perjury</li>
              <li>Your physical or electronic signature</li>
            </ul>

            <h2>5. Contact</h2>
            <p>
              Copyright inquiries:
              <br />
              <strong>Email:</strong>{' '}
              <a href="mailto:copyright@dead-as-disco.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                copyright@dead-as-disco.wiki
              </a>
            </p>
            <p>
              DMCA notices:
              <br />
              <strong>Email:</strong>{' '}
              <a href="mailto:dmca@dead-as-disco.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                dmca@dead-as-disco.wiki
              </a>
            </p>

            <h2>6. Disclaimer</h2>
            <p>
              Dead as Disco Wiki is an unofficial fan-made website and is not affiliated with Brain Jar Games, Valve,
              or any official publisher/platform owner.
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
