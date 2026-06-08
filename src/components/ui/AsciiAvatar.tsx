import { AsciiImage } from './AsciiImage'
import { AVATAR_FRAME_A } from '@/data/avatar'

/**
 * Renders an ASCII portrait converted from the real photo at /avatar.jpg.
 * Falls back to the static art if the image is missing.
 */
export function AsciiAvatar() {
  return <AsciiImage src="/avatar.jpg" columns={84} fallback={AVATAR_FRAME_A.replace(/^\n/, '')} />
}
