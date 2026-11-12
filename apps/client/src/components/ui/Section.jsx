export default function Section({ id, className = '', children }) {
  return (
    <section
      id={id}
      className={`mx-auto max-w-6xl scroll-mt-28 px-5 py-16 sm:px-6 sm:py-24 ${className}`}
    >
      {children}
    </section>
  )
}
