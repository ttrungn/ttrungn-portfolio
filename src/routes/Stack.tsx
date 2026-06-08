import { PageScaffold } from '@/components/layout/PageScaffold'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { TypeLine } from '@/hooks/useTypewriter'
import { skillBars, skillGroups } from '@/data/resume'

const boot: TypeLine[] = [
  { text: 'systeminfo --skills', kind: 'cmd', className: 'text-accent', speed: 22 },
  { text: 'profiling capabilities...', className: 'text-phosphor-dim', speed: 12 },
]

export function Stack() {
  return (
    <PageScaffold boot={boot}>
      <SectionHeading>proficiency</SectionHeading>
      <div className="flex flex-wrap gap-1.5">
        {skillBars.map((bar) => (
          <span
            key={bar.label}
            className="rounded border border-phosphor-dim px-2 py-0.5 text-[11px] text-phosphor transition-colors hover:border-accent hover:text-accent"
          >
            {bar.label}
          </span>
        ))}
      </div>

      <SectionHeading level={2}>tech_stack</SectionHeading>
      <div className="space-y-3">
        {skillGroups.map((group) => (
          <div key={group.label}>
            <p className="text-xs text-phosphor-dim">{group.label}:</p>
            <div className="mt-1 flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded border border-phosphor-dim px-2 py-0.5 text-[11px] text-phosphor transition-colors hover:border-accent hover:text-accent"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PageScaffold>
  )
}
