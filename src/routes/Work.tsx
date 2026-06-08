import { PageScaffold } from '@/components/layout/PageScaffold'
import { ProjectCard } from '@/components/ui/ProjectCard'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { TypeLine } from '@/hooks/useTypewriter'
import { projects } from '@/data/resume'

const boot: TypeLine[] = [
  { text: 'ls -la ~/projects', kind: 'cmd', className: 'text-accent', speed: 22 },
  {
    text: `found ${projects.length} repositories ▸ rendering...`,
    className: 'text-phosphor-dim',
    speed: 12,
  },
]

export function Work() {
  return (
    <PageScaffold boot={boot}>
      <SectionHeading>selected_work</SectionHeading>
      <div className="mt-2 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </PageScaffold>
  )
}
