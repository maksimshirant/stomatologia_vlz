import { assetUrl } from '../lib/assetUrl'

export const SHOW_BRAND_LOGO = false

export const BRAND = {
  name: 'Ваш бренд',
  logoSrc: assetUrl('Logo.png'),
  logoPlaceholder: 'ВАШ ЛОГО',
  tagline: 'Временная заглушка для бренда. Финальный логотип и фирменный блок можно вернуть в один шаг.',
} as const

export const CONTACT_INFO = {
  phoneHref: 'tel:+79215551428',
  phoneDisplay: '+7 (921) 555-14-28',
  emailHref: 'mailto:hello@yourbrand.studio',
  emailDisplay: 'hello@yourbrand.studio',
  telegramHref: 'https://t.me/yourbrand_studio',
  telegramLabel: '@yourbrand_studio',
  address: 'Санкт-Петербург, Литейный проспект, 34',
  shortLocation: 'Санкт-Петербург, центр',
  hours: '11:00–22:00',
  mapTitle: 'Карта появится после подтверждения финального адреса',
} as const
