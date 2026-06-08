import { NavLink, useLocation } from 'react-router-dom'

const NAV = [
  { to: '/', label: 'home', route: 'home' },
  { to: '/about', label: 'about', route: 'about' },
  { to: '/work', label: 'work', route: 'work' },
  { to: '/stack', label: 'stack', route: 'stack' },
  { to: '/contact', label: 'contact', route: 'contact' },
]

export function TopBar() {
  const { pathname } = useLocation()
  const current = pathname === '/' ? '~/home' : `~${pathname}`

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-t-lg border border-phosphor-dim bg-[rgb(10_14_10/0.8)] px-4 py-2.5 text-xs">
      <span className="h-2.5 w-2.5 rounded-full border border-phosphor-dim bg-err/30" />
      <span className="h-2.5 w-2.5 rounded-full border border-phosphor-dim bg-warn/30" />
      <span className="h-2.5 w-2.5 rounded-full border border-phosphor-dim bg-accent/30" />
      <span className="ml-2 tracking-wide text-phosphor-dim">{current}</span>

      <nav className="ml-auto flex flex-wrap gap-1.5">
        {NAV.map((item) => (
          <NavLink
            key={item.route}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `rounded border px-2.5 py-1 tracking-wide transition-all duration-150 ${
                isActive
                  ? 'border-accent text-accent shadow-[0_0_10px_var(--glow)] bg-[rgb(155_247_192/0.06)]'
                  : 'border-transparent text-phosphor hover:border-phosphor-dim hover:text-accent'
              }`
            }
          >
            <span className="text-phosphor-dim">~/</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
