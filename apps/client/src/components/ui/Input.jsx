export default function Input({
  label,
  id,
  error,
  multiline = false,
  className = '',
  ...props
}) {
  const Field = multiline ? 'textarea' : 'input'

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={id} className="font-mono text-xs uppercase tracking-[0.15em] text-text-muted">
          {label}
        </label>
      )}
      <Field
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`rounded-xl border bg-bg/60 px-4 py-3 text-text outline-none transition-colors focus:border-accent ${
          error ? 'border-danger' : 'border-white/15'
        } ${className}`}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  )
}
