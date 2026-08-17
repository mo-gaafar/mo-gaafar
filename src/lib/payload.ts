import { getPayload as getPayloadInstance } from 'payload'
import config from '@payload-config'

/**
 * Cached Payload local API client for use in Server Components.
 */
export const getPayloadClient = async () => {
  return getPayloadInstance({ config })
}

/** Resolve a media upload or a fallback URL string to a usable src. */
export const mediaUrl = (
  media: unknown,
  fallback?: string | null,
): string | null => {
  if (media && typeof media === 'object' && 'url' in media) {
    const url = (media as { url?: string | null }).url
    if (url) return url
  }
  return fallback ?? null
}

export const mediaAlt = (media: unknown, fallback = ''): string => {
  if (media && typeof media === 'object' && 'alt' in media) {
    const alt = (media as { alt?: string | null }).alt
    if (alt) return alt
  }
  return fallback
}
