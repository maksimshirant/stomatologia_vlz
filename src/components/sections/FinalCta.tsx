import { Button } from '../ui/Button'
import { Container } from '../ui/Container'

export function FinalCta({ onOpenBooking }: { onOpenBooking: () => void }) {
  return (
    <section className="bg-[var(--color-accent-pale)] py-16 md:py-20">
      <Container>
        <div className="rounded-[30px] bg-[var(--color-heading)] px-6 py-10 text-white sm:px-10">
          <div className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent-light)]">Ваша улыбка заслуживает заботы</div>
          <h2 className="section-heading mt-4 text-balance text-4xl font-semibold leading-[0.93] tracking-[-0.055em] [font-family:var(--font-display)] sm:text-5xl sm:font-medium sm:leading-[0.98]"><span className="text-[var(--color-accent-light)]">Расскажите</span> о своей ситуации — найдём комфортное решение</h2>
          <Button type="button" onClick={onOpenBooking} className="mt-8">Получить консультацию</Button>
        </div>
      </Container>
    </section>
  )
}
