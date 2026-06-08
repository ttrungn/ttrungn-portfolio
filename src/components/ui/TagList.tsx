interface TagListProps {
  tags: string[]
}

export function TagList({ tags }: TagListProps) {
  return (
    <div className="mt-2 flex flex-wrap gap-1.5">
      {tags.map((t) => (
        <span
          key={t}
          className="rounded border border-phosphor-dim px-1.5 py-px text-[10px] text-phosphor-dim"
        >
          {t}
        </span>
      ))}
    </div>
  )
}
