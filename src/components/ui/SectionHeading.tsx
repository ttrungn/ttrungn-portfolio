interface SectionHeadingProps {
  children: React.ReactNode
  level?: 1 | 2
  tone?: 'accent' | 'err'
}

/**
 * Markdown-style section heading: `## title` or `> title`.
 */
export function SectionHeading({ children, level = 1, tone = 'accent' }: SectionHeadingProps) {
  const prefix = level === 1 ? '## ' : '> '
  const color = tone === 'err' ? 'text-err' : 'text-accent'
  return (
    <h2 className={`mt-5 mb-1 text-base font-bold tracking-wide ${color} text-glow`}>
      <span className="text-phosphor-dim">{prefix}</span>
      {children}
    </h2>
  )
}
