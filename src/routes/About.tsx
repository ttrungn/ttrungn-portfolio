import { PageScaffold } from '@/components/layout/PageScaffold'
import { InfoList } from '@/components/ui/InfoList'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { TagList } from '@/components/ui/TagList'
import type { TypeLine } from '@/hooks/useTypewriter'
import { profile, experience, education, languages } from '@/data/resume'

const boot: TypeLine[] = [
  { text: 'cat about.txt', kind: 'cmd', className: 'text-accent', speed: 24 },
  { text: 'decrypting bio...', className: 'text-phosphor-dim', speed: 12 },
]

export function About() {
  return (
    <PageScaffold boot={boot}>
      <SectionHeading>whoami</SectionHeading>
      <p className="max-w-[72ch] text-phosphor">{profile.summary}</p>

      <SectionHeading level={2}>experience</SectionHeading>
      <div className="space-y-5">
        {experience.map((job) => (
          <article key={`${job.company}-${job.period}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4">
              <h3 className="text-[0.95rem] font-bold text-accent">
                {job.role}
                <span className="ml-2 font-normal text-phosphor-dim">@ {job.company}</span>
              </h3>
              <span className="text-xs text-phosphor-dim">
                {job.period} · {job.location}
              </span>
            </div>
            <ul className="mt-1 space-y-1 text-[0.85rem] leading-6 text-phosphor">
              {job.highlights.map((h, i) => (
                <li
                  key={i}
                  className="before:mr-1 before:text-phosphor-dim before:content-['–']"
                >
                  {h}
                </li>
              ))}
            </ul>
            <TagList tags={job.tech} />
          </article>
        ))}
      </div>

      <SectionHeading level={2}>education</SectionHeading>
      {education.map((ed) => (
        <div key={ed.school} className="mb-2">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <h3 className="text-[0.95rem] font-bold text-accent">
              {ed.degree}
              <span className="ml-2 font-normal text-phosphor-dim">@ {ed.school}</span>
            </h3>
            <span className="text-xs text-phosphor-dim">
              {ed.period} · {ed.location}
            </span>
          </div>
          <ul className="mt-1 flex flex-wrap gap-x-4 text-[0.85rem] text-phosphor">
            {ed.details.map((d, i) => (
              <li key={i} className="before:mr-1 before:text-phosphor-dim before:content-['▸']">
                {d}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <SectionHeading level={2}>languages</SectionHeading>
      <InfoList rows={languages.map((l) => ({ term: 'lang', value: l }))} />
    </PageScaffold>
  )
}
