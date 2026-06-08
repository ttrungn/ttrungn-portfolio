import { PageScaffold } from '@/components/layout/PageScaffold'
import { AsciiAvatar } from '@/components/ui/AsciiAvatar'
import { InfoList } from '@/components/ui/InfoList'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { TypeLine } from '@/hooks/useTypewriter'
import { profile, contact } from '@/data/resume'

const boot: TypeLine[] = [
  { text: 'ssh visitor@ttrungn.dev', kind: 'cmd', className: 'text-accent', speed: 26 },
  { text: '[ OK ] handshake complete  ▸ AES-256', className: 'text-accent', speed: 10 },
  { text: 'access granted. welcome, visitor.', className: 'text-accent', speed: 12 },
]

export function Home() {
  return (
    <PageScaffold boot={boot}>
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
        <AsciiAvatar />
        <div>
          <h1 className="text-base font-bold tracking-wide text-accent text-glow">
            <span className="text-phosphor-dim">## </span>
            {profile.name.toUpperCase()}
          </h1>
          <p className="my-1 text-phosphor">{profile.title}</p>
          <div className="mt-3">
            <InfoList
              rows={[
                { term: 'handle', value: `@${profile.handle}` },
                { term: 'location', value: contact.location },
                { term: 'email', value: contact.email },
              ]}
            />
          </div>
          <SectionHeading level={2}>summary</SectionHeading>
          <p className="max-w-[70ch] text-phosphor-dim">{profile.summary}</p>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-block rounded border border-accent px-3 py-1.5 text-xs tracking-wide text-accent transition-all hover:bg-[rgb(155_247_192/0.1)] hover:shadow-[0_0_14px_var(--glow)]"
          >
            $ download resume.pdf
          </a>
        </div>
      </div>
    </PageScaffold>
  )
}
