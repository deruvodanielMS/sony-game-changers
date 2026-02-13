/**
 * Centralized profile image URL handling
 * All profile images should go through this utility to ensure consistent URLs
 */

const PROFILE_IMG_PREFIX = '/profile-img/'
const DEFAULT_PROFILE_IMAGE = '/profile-img/profile.png'

/**
 * Normalizes a profile image URL to ensure it has the correct format
 * Handles: null, undefined, empty string, filename only, or full path
 *
 * @param url - The profile image URL from database or API
 * @returns Normalized URL with /profile-img/ prefix, or default image
 *
 * @example
 * getProfileImageUrl(null) // '/profile-img/profile.png'
 * getProfileImageUrl('sarah-miller.png') // '/profile-img/sarah-miller.png'
 * getProfileImageUrl('/profile-img/sarah-miller.png') // '/profile-img/sarah-miller.png' (no double prefix)
 */
export function getProfileImageUrl(url: string | null | undefined): string {
  if (!url) {
    return DEFAULT_PROFILE_IMAGE
  }

  // Already has the correct prefix - return as-is
  if (url.startsWith(PROFILE_IMG_PREFIX)) {
    return url
  }

  // Has a leading slash but different path - return as-is (external or other path)
  if (url.startsWith('/') || url.startsWith('http')) {
    return url
  }

  // Just a filename - add the prefix
  return `${PROFILE_IMG_PREFIX}${url}`
}

/**
 * Same as getProfileImageUrl but returns null instead of default for missing images
 * Use this when you want to handle missing images differently (e.g., show initials)
 */
export function getProfileImageUrlOrNull(url: string | null | undefined): string | null {
  if (!url) {
    return null
  }

  return getProfileImageUrl(url)
}
