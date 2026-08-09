import { useEffect, useEffectEvent, type ReactNode } from 'react'

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

export function Modal({
  open,
  eyebrow = 'Консультация',
  title,
  description,
  children,
  panelClassName,
  contentClassName,
  contentScrollable = true,
  eyebrowHighlight,
  showEyebrowGraphic = true,
  onClose,
}: {
  open: boolean
  eyebrow?: string
  title: string
  description?: string
  children: ReactNode
  panelClassName?: string
  contentClassName?: string
  contentScrollable?: boolean
  eyebrowHighlight?: string
  showEyebrowGraphic?: boolean
  onClose: () => void
}) {
  const handleClose = useEffectEvent(() => {
    onClose()
  })

  useEffect(() => {
    if (!open) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[80]"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-[rgba(15,55,64,0.34)] backdrop-blur-md"
        aria-label="Закрыть окно"
      />
      <div className="relative mx-auto flex min-h-full w-full items-end sm:items-center sm:px-6 sm:py-10">
        <div
          className={cx(
            'mx-auto flex h-[100dvh] w-full max-w-xl flex-col overflow-hidden bg-white shadow-[0_40px_120px_rgba(15,55,64,0.24)] sm:h-auto sm:max-h-[calc(100vh-5rem)] sm:rounded-[24px] sm:border sm:border-white',
            panelClassName,
          )}
        >
          <div className="px-5 py-4 sm:px-6">
            <div className="flex items-center justify-between gap-4">
              <div className="text-3xl leading-none text-[var(--color-heading)] [font-family:var(--font-display)] sm:text-4xl">
                {eyebrow ? (
                  <>
                    <span className="text-[var(--color-accent-strong)]">{eyebrowHighlight ?? eyebrow.split(' ')[0]}</span>{eyebrow.slice((eyebrowHighlight ?? eyebrow.split(' ')[0]).length)}
                    {showEyebrowGraphic ? <svg viewBox="0 0 36 36" fill="none" className="ml-2 inline-block h-[0.65em] w-[0.65em] align-baseline text-[var(--color-accent-strong)]" aria-hidden="true"><path d="M10.5 5.5c3.1 0 3.9 1.7 7.5 1.7s4.4-1.7 7.5-1.7c4.1 0 6.9 3.3 6.9 7.3 0 3.4-1.7 5.5-2.9 8.5-1.5 3.8-1.8 9.5-5.5 9.5-2.7 0-1.8-6.6-6-6.6s-3.3 6.6-6 6.6c-3.7 0-4-5.7-5.5-9.5-1.2-3-2.9-5.1-2.9-8.5 0-4 2.8-7.3 6.9-7.3Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" /></svg> : null}
                  </>
                ) : eyebrow}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center text-[var(--color-heading)] transition hover:text-[var(--color-accent-strong)]"
                aria-label="Закрыть окно"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  aria-hidden="true"
                >
                  <path
                    d="M6 6L18 18M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div
            className={cx(
              contentScrollable && 'overflow-y-auto',
              'px-5 py-5 sm:px-6 sm:py-6',
              contentClassName,
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
