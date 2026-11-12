import { Link } from 'react-router-dom'

const variants = {
  primary: 'bg-text text-bg hover:bg-accent',
  secondary: 'border border-white/20 text-text hover:border-accent hover:text-accent',
  dark: 'bg-bg text-text hover:bg-surface-2',
  outlineDark: 'border border-bg/40 text-bg hover:bg-bg hover:text-text',
}

const base =
  'group/button inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-wide transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-40'

export default function Button({
  to,
  href,
  variant = 'primary',
  className = '',
  children,
  ...props
}) {
  const classes = `${base} ${variants[variant]} ${className}`
  const content = (
    <>
      {children}
      <span
        aria-hidden="true"
        className="transition-transform duration-300 group-hover/button:translate-x-1"
      >
        →
      </span>
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...props}>
      {content}
    </button>
  )
}
