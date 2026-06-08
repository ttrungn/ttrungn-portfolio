interface DefRow {
  term: string
  value: React.ReactNode
}

interface InfoListProps {
  rows: DefRow[]
}

/**
 * Two-column definition list (term / value) in terminal style.
 */
export function InfoList({ rows }: InfoListProps) {
  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-1.5">
      {rows.map((r, i) => (
        <div key={i} className="contents">
          <dt className="text-phosphor-dim">{r.term}</dt>
          <dd className="text-phosphor">{r.value}</dd>
        </div>
      ))}
    </dl>
  )
}
