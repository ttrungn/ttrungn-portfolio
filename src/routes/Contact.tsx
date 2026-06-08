import { useActionState } from 'react'
import { PageScaffold } from '@/components/layout/PageScaffold'
import { InfoList } from '@/components/ui/InfoList'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { TypeLine } from '@/hooks/useTypewriter'
import { contact } from '@/data/resume'

const boot: TypeLine[] = [
  { text: './establish_connection.sh', kind: 'cmd', className: 'text-accent', speed: 22 },
  { text: 'opening secure channel...', className: 'text-phosphor-dim', speed: 12 },
  { text: '[ OK ] ready to receive transmission', className: 'text-accent', speed: 12 },
]

interface FormState {
  status: 'idle' | 'ok' | 'error'
  message: string
}

const initialState: FormState = { status: 'idle', message: '' }

// React 19 Action: receives previous state + FormData, returns next state.
async function sendMessage(_prev: FormState, formData: FormData): Promise<FormState> {
  const name = String(formData.get('name') ?? '').trim()
  const email = String(formData.get('email') ?? '').trim()
  const message = String(formData.get('message') ?? '').trim()

  if (!name || !email || !message) {
    return { status: 'error', message: 'all fields required.' }
  }
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  if (!emailOk) {
    return { status: 'error', message: 'invalid email address.' }
  }

  // Simulated async transmission. Swap for Formspree/EmailJS/API later.
  await new Promise((r) => setTimeout(r, 900))

  return {
    status: 'ok',
    message: `✓ transmission received. thanks, ${name} — i'll reply to ${email}.`,
  }
}

export function Contact() {
  const [state, formAction, pending] = useActionState(sendMessage, initialState)

  return (
    <PageScaffold boot={boot}>
      <SectionHeading>get_in_touch</SectionHeading>
      <p className="max-w-[70ch] text-phosphor">
        Open to roles, collaborations, and interesting problems. Send a transmission
        below or reach out directly.
      </p>

      <form action={formAction} className="mt-3 max-w-xl">
        <Field label="name" name="name" placeholder="visitor" />
        <Field label="email" name="email" type="email" placeholder="you@domain.com" />
        <div className="mb-4">
          <label htmlFor="message" className="mb-1 block text-xs text-phosphor-dim">
            &gt; message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="type your message..."
            className="w-full rounded border border-phosphor-dim bg-black/35 p-2.5 text-[13px] text-phosphor outline-none focus:border-accent focus:shadow-[0_0_10px_var(--glow)]"
          />
        </div>

        <button
          type="submit"
          disabled={pending}
          className="rounded border border-accent px-4 py-2 text-[13px] tracking-wide text-accent transition-all hover:bg-[rgb(155_247_192/0.1)] hover:shadow-[0_0_14px_var(--glow)] disabled:opacity-50"
        >
          {pending ? '[ transmitting... ]' : '[ transmit ]'}
        </button>

        {state.status !== 'idle' && (
          <span
            className={`ml-3 text-[13px] ${
              state.status === 'ok' ? 'text-accent' : 'text-err'
            }`}
          >
            {state.message}
          </span>
        )}
      </form>

      <SectionHeading level={2}>direct</SectionHeading>
      <InfoList
        rows={[
          {
            term: 'email',
            value: (
              <a className="border-b border-dotted border-accent text-accent" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            ),
          },
          { term: 'phone', value: contact.phone },
          {
            term: 'github',
            value: (
              <a className="border-b border-dotted border-accent text-accent" href={contact.githubUrl} target="_blank" rel="noreferrer">
                github.com/{contact.github}
              </a>
            ),
          },
          {
            term: 'linkedin',
            value: (
              <a className="border-b border-dotted border-accent text-accent" href={contact.linkedinUrl} target="_blank" rel="noreferrer">
                in/{contact.linkedin}
              </a>
            ),
          },
        ]}
      />
    </PageScaffold>
  )
}

interface FieldProps {
  label: string
  name: string
  type?: string
  placeholder?: string
}

function Field({ label, name, type = 'text', placeholder }: FieldProps) {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="mb-1 block text-xs text-phosphor-dim">
        &gt; {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full rounded border border-phosphor-dim bg-black/35 p-2.5 text-[13px] text-phosphor outline-none focus:border-accent focus:shadow-[0_0_10px_var(--glow)]"
      />
    </div>
  )
}
