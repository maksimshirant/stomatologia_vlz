type MetrikaGoalId = 'ym-open-leadform' | 'ym-submit-leadform'

type MetrikaInitOptions = {
  clickmap: true
  trackLinks: true
  accurateTrackBounce: true
  webvisor: true
}

type MetrikaArguments =
  | [counterId: number, method: 'init', options: MetrikaInitOptions]
  | [counterId: number, method: 'reachGoal', goalId: MetrikaGoalId]

type MetrikaFunction = ((...args: MetrikaArguments) => void) & {
  a?: MetrikaArguments[]
  l?: number
}

declare global {
  interface Window {
    ym?: MetrikaFunction
  }
}

// Возвращает корректный номер счётчика из окружения или отключает интеграцию.
function getCounterId() {
  const counterId = Number(import.meta.env.VITE_YANDEX_METRIKA_ID)
  return Number.isInteger(counterId) && counterId > 0 ? counterId : null
}

// Подключает Метрику только после передачи настоящего номера счётчика через переменную окружения.
export function initializeYandexMetrika() {
  const counterId = getCounterId()
  if (!counterId || document.querySelector('script[data-yandex-metrika]')) return

  const queue: MetrikaFunction = (...args) => {
    queue.a?.push(args)
  }
  queue.a = []
  queue.l = Date.now()
  window.ym = queue
  window.ym(counterId, 'init', {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
  })

  const script = document.createElement('script')
  script.async = true
  script.src = 'https://mc.yandex.ru/metrika/tag.js'
  script.dataset.yandexMetrika = 'true'
  document.head.append(script)
}

// Передаёт цели заявки в Метрику, когда счётчик был активирован для сайта.
export function trackYandexMetrikaGoal(goalId: MetrikaGoalId) {
  const counterId = getCounterId()
  if (counterId && window.ym) {
    window.ym(counterId, 'reachGoal', goalId)
  }
}
