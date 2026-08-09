import { Modal } from '../ui/Modal'

const POLICY_ITEMS = [
  'В форме мы запрашиваем имя, телефон, необязательный вопрос и ответы квиза — только то, что нужно для обработки вашей заявки.',
  'Данные используем только для связи, уточнения вашего запроса и согласования времени консультации.',
  'Ответы квиза не являются медицинской диагностикой и не заменяют очную консультацию врача.',
  'Вы можете уточнить, изменить или удалить свои данные, позвонив по телефону на сайте.',
]

export function PrivacyPolicyModal({ open, mode = 'policy', onClose }: { open: boolean; mode?: 'consent' | 'policy'; onClose: () => void }) {
  return (
    <Modal open={open} eyebrow="Ваши данные" title="Как мы бережно используем данные из заявки" onClose={onClose}>
      <div className="grid gap-5">
        {mode === 'consent' ? <p className="text-sm leading-7 text-[var(--color-muted)]">Согласие на обработку персональных данных подтверждает, что вы разрешаете использовать указанные в форме контакты для обработки вашей заявки и связи с вами.</p> : null}
        {POLICY_ITEMS.map((item) => <p key={item} className="text-sm leading-7 text-[var(--color-muted)]">{item}</p>)}
        <p className="border-t border-[var(--color-line)] pt-5 text-sm leading-7 text-[var(--color-muted)]">Отправляя заявку, вы соглашаетесь на обработку указанных данных, чтобы мы могли связаться с вами.</p>
      </div>
    </Modal>
  )
}
