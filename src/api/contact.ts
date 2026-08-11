export type BookingPayload = {
  source: 'feedback' | 'quiz'
  name: string
  phone: string
  question?: string
  quizAnswers?: ReadonlyArray<{
    id: 'reason' | 'symptoms' | 'previous-treatment' | 'service' | 'timing'
    question: string
    answer: string
  }>
}

export type BookingResult = { ok: true }

const RU_PHONE_REGEX = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/
const CONTACT_API_URL = (
  import.meta.env.VITE_CONTACT_FORM_ENDPOINT ?? import.meta.env.VITE_CONTACT_API_URL
)?.trim()

// Приводит ввод пользователя к единому формату российского номера.
export const formatRussianPhone = (raw: string) => {
  const digits = raw.replace(/\D/g, '')
  if (!digits) return ''

  const normalized = digits.startsWith('8') ? `7${digits.slice(1)}` : digits
  const national = normalized.startsWith('7') ? normalized.slice(1, 11) : normalized.slice(0, 10)

  let formatted = '+7'
  if (national.length > 0) formatted += ` (${national.slice(0, 3)}`
  if (national.length >= 3) formatted += ')'
  if (national.length > 3) formatted += ` ${national.slice(3, 6)}`
  if (national.length > 6) formatted += `-${national.slice(6, 8)}`
  if (national.length > 8) formatted += `-${national.slice(8, 10)}`

  return formatted
}

// Проверяет, что номер полностью заполнен в российском формате.
export const isValidRussianPhone = (phone: string) => RU_PHONE_REGEX.test(phone)

// Имитирует отправку обращения до подключения реального API клиники.
// Отправляет заявку в публичную HTTP-функцию Yandex Cloud.
export async function sendBooking(payload: BookingPayload): Promise<BookingResult> {

  if (!payload.name.trim()) throw new Error('Укажите, как к вам обращаться')

  if (!isValidRussianPhone(payload.phone)) {
    throw new Error('Проверьте номер телефона для связи')
  }

  if (!CONTACT_API_URL) {
    throw new Error('Форма временно недоступна')
  }

  let response: Response
  try {
    response = await fetch(CONTACT_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  } catch {
    throw new Error('Не удалось отправить заявку. Попробуйте ещё раз.')
  }

  if (!response.ok) {
    throw new Error('Не удалось отправить заявку. Попробуйте ещё раз.')
  }

  return { ok: true }
}

