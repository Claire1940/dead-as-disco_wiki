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
  const path = '/terms-of-service'
  const imageUrl = new URL('/images/hero.webp', siteUrl).toString()
  const title = 'Terms of Service - Dead as Disco Wiki'
  const description = 'Terms of Service for Dead as Disco Wiki, including usage rules, intellectual property, and disclaimers.'

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

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-slate-300 text-lg mb-2">Rules for using Dead as Disco Wiki</p>
          <p className="text-slate-400 text-sm">Last Updated: May 6, 2026</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>1. Acceptance</h2>
            <p>
              By accessing or using Dead as Disco Wiki, you agree to these Terms of Service. If you do not agree, do
              not use this website.
            </p>

            <h2>2. Service Description</h2>
            <p>
              Dead as Disco Wiki is an unofficial fan resource that provides guides, references, and community-oriented
              information related to the game <strong>Dead as Disco</strong>.
            </p>

            <h2>3. Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use the site for unlawful activity</li>
              <li>Attempt unauthorized access to site systems</li>
              <li>Disrupt service availability or security</li>
              <li>Use bots/scrapers in ways that cause operational harm</li>
              <li>Copy or republish site content for commercial use without permission</li>
            </ul>

            <h2>4. Intellectual Property</h2>
            <p>
              Original website content (text, structure, and original media where applicable) belongs to Dead as Disco
              Wiki unless otherwise stated.
            </p>
            <p>
              Game-related names, logos, trademarks, and assets are owned by their respective rights holders.
            </p>

            <h2>5. Accuracy and Availability</h2>
            <p>
              We work to keep information accurate and current, but we do not guarantee completeness, correctness, or
              uninterrupted availability.
            </p>

            <h2>6. Third-Party Links</h2>
            <p>
              The site may link to Steam, Discord, Reddit, YouTube, and other third-party platforms. We do not control
              third-party content or services and are not responsible for them.
            </p>

            <h2>7. Disclaimer of Affiliation</h2>
            <p>
              Dead as Disco Wiki is <strong>unofficial</strong> and is not affiliated with, endorsed by, or sponsored by
              Brain Jar Games, Valve, or other platform owners.
            </p>

            <h2>8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Dead as Disco Wiki and its maintainers are not liable for direct,
              indirect, incidental, or consequential damages arising from use of the site.
            </p>

            <h2>9. Changes to Terms</h2>
            <p>
              We may revise these terms at any time. Changes take effect when posted. Continued use after updates means
              you accept the revised terms.
            </p>

            <h2>10. Contact</h2>
            <p>
              Legal or policy questions:
              <br />
              <strong>Email:</strong>{' '}
              <a href="mailto:legal@dead-as-disco.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                legal@dead-as-disco.wiki
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
