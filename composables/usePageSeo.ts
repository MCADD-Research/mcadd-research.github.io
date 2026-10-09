import { site } from '~/content/site'

interface SeoOptions {
  title?: string
  description?: string
  /** Optional JSON-LD object(s) to inject. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

export function usePageSeo(options: SeoOptions = {}) {
  const route = useRoute()

  const title = options.title ? `${options.title} · ${site.name}` : site.longTitle
  const description = options.description || site.description
  // Ensure trailing slash for canonical consistency (live site 301s to trailing slash)
  const pathWithSlash = route.path.endsWith('/') ? route.path : route.path + '/'
  const url = `${site.siteUrl}${pathWithSlash}`

  useSeoMeta({
    title,
    description,
    ogTitle: title,
    ogDescription: description,
    ogType: 'website',
    ogUrl: url,
    ogImage: site.ogImageUrl,
    twitterCard: 'summary_large_image',
    twitterImage: site.ogImageUrl,
  })

  useHead({
    link: [{ rel: 'canonical', href: url }],
  })

  if (options.jsonLd) {
    useJsonLd(options.jsonLd)
  }
}
