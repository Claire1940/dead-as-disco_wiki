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
  const path = '/privacy-policy'
  const imageUrl = new URL('/images/hero.webp', siteUrl).toString()
  const title = 'Privacy Policy - Dead as Disco Wiki'
  const description = 'Privacy Policy for Dead as Disco Wiki. Learn what data we collect, how it is used, and how to contact us.'

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

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      <section className="relative py-20 px-4 border-b border-border">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-slate-300 text-lg mb-2">How Dead as Disco Wiki handles visitor data</p>
          <p className="text-slate-400 text-sm">Last Updated: May 6, 2026</p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="prose prose-invert prose-slate max-w-none">
            <h2>1. Scope</h2>
            <p>
              This Privacy Policy applies to <strong>dead-as-disco.wiki</strong> and its localized pages. Dead as Disco
              Wiki is an unofficial fan resource focused on guides and informational content.
            </p>

            <h2>2. Data We Collect</h2>
            <ul>
              <li><strong>Technical logs:</strong> IP address, browser type, device information, and request metadata.</li>
              <li><strong>Usage analytics:</strong> Page views, navigation paths, and aggregate performance metrics.</li>
              <li><strong>Preference data:</strong> Locale/theme preferences stored in your browser.</li>
            </ul>
            <p>We do not intentionally collect sensitive personal data through this website.</p>

            <h2>3. Why We Use Data</h2>
            <ul>
              <li>Operate and secure the website</li>
              <li>Measure content quality and improve user experience</li>
              <li>Diagnose technical issues and prevent abuse</li>
            </ul>

            <h2>4. Cookies and Similar Technologies</h2>
            <p>
              We may use cookies or browser storage for analytics and user preferences. You can disable cookies in your
              browser settings, but some site features may not function as intended.
            </p>

            <h2>5. Third-Party Services</h2>
            <p>
              We may use third-party analytics, advertising, or infrastructure providers. Those services process data
              under their own privacy policies.
            </p>

            <h2>6. External Links</h2>
            <p>
              Pages may link to third-party platforms such as Steam, Discord, Reddit, YouTube, and the official Dead as
              Disco website. We are not responsible for third-party privacy practices.
            </p>

            <h2>7. Data Retention</h2>
            <p>
              We retain collected data only for as long as needed for operations, security, and analytics, or as
              required by law.
            </p>

            <h2>8. Children</h2>
            <p>
              This site is intended for a general audience and is not directed to children under 13. If you believe data
              from a child was submitted to us, contact us and we will review removal requests.
            </p>

            <h2>9. Policy Updates</h2>
            <p>
              We may update this policy from time to time. Changes take effect when published. The date above reflects
              the latest update.
            </p>

            <h2>10. Contact</h2>
            <p>
              Privacy questions or requests:
              <br />
              <strong>Email:</strong>{' '}
              <a href="mailto:privacy@dead-as-disco.wiki" className="text-[hsl(var(--nav-theme-light))] hover:underline">
                privacy@dead-as-disco.wiki
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
