import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'ghost' | 'outline'
type Size = 'xs' | 'sm' | 'md'

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  size?: Size
  children: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={cx(
        'inline-flex items-center justify-center gap-2 rounded-md border font-semibold transition duration-300',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
        'disabled:cursor-not-allowed disabled:opacity-60',
        size === 'xs' && 'px-4 py-2.5 text-xs',
        size === 'sm' && 'px-4 py-2 text-xs',
        size === 'md' && 'px-6 py-3.5 text-sm',
        variant === 'primary' &&
          'border-[var(--color-accent)] bg-[var(--color-accent)] text-white shadow-[0_14px_32px_rgba(20,184,196,0.2)] hover:border-[var(--color-accent-strong)] hover:bg-[var(--color-accent-strong)]',
        variant === 'outline' &&
          'border-[var(--color-line)] bg-white text-[var(--color-heading)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent-strong)]',
        variant === 'ghost' &&
          'border-transparent bg-transparent text-[var(--color-heading)] hover:text-[var(--color-accent-strong)]',
        className,
      )}
    >
      {children}
    </button>
  )
}
