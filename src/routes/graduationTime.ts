export const CEREMONY_START = Date.parse('2026-11-07T10:00:00+07:00');
export const CEREMONY_END = Date.parse('2026-11-07T12:00:00+07:00');

export function getCeremonyTime(now: number) {
  const seconds = Math.max(0, Math.floor((CEREMONY_START - now) / 1000));
  return {
    phase: now >= CEREMONY_END ? 'ended' : now >= CEREMONY_START ? 'live' : 'upcoming',
    values: [Math.floor(seconds / 86400), Math.floor(seconds / 3600) % 24, Math.floor(seconds / 60) % 60, seconds % 60],
  };
}
