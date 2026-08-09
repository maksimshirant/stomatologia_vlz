import { Button } from '../ui/Button'
import { Container } from '../ui/Container'

export function Story({ id, onCta }: { id: string; onCta: () => void }) {
  return (
    <section id={id} className="bg-[var(--color-bg)] py-16 md:py-20">
      <Container>
        <div className="rounded-[30px] border border-[var(--color-line)] p-7 md:p-10">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-strong)]">Забота о вас</div>
          <h2 className="section-heading mt-4 text-balance text-4xl font-semibold leading-[0.93] tracking-[-0.055em] text-[var(--color-heading)] [font-family:var(--font-display)] sm:font-medium sm:leading-[0.98]">Понятный путь к <span className="text-[var(--color-accent-strong)]">улыбке</span>, которой вы довольны</h2>
          <Button type="button" variant="outline" onClick={onCta} className="mt-6">Получить консультацию</Button>
        </div>
      </Container>
    </section>
  )
}
