import type { ProjectItem } from '@/data/resume'
import { TagList } from './TagList'

interface ProjectCardProps {
  project: ProjectItem
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="group rounded-md border border-phosphor-dim bg-[rgb(155_247_192/0.03)] p-4 transition-all duration-150 hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_0_16px_var(--glow)]">
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-phosphor-dim">{project.id}</span>
        <span className="text-[11px] text-phosphor-dim">{project.period}</span>
      </div>
      <h3 className="my-1 text-[0.95rem] font-bold tracking-wide text-accent">
        {project.name}
        <span className="ml-2 text-xs font-normal text-phosphor-dim">
          {project.tagline}
        </span>
      </h3>
      <p className="text-[11px] text-phosphor-dim">{project.role}</p>
      <ul className="mt-2 space-y-1 text-[0.82rem] leading-6 text-phosphor">
        {project.description.map((d, i) => (
          <li key={i} className="before:mr-1 before:text-phosphor-dim before:content-['–']">
            {d}
          </li>
        ))}
      </ul>
      <TagList tags={project.tech} />
      {project.url && (
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-block border-b border-dotted border-accent text-xs text-accent hover:bg-[rgb(155_247_192/0.08)]"
        >
          ▸ {project.url.replace(/^https?:\/\//, '')}
        </a>
      )}
    </article>
  )
}
