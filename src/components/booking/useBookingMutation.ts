import { useMutation } from '@tanstack/react-query'
import type { BookingPayload, BookingResult } from '../../api/contact'
import { sendBooking } from '../../api/contact'
import { trackYandexMetrikaGoal } from '../../api/yandexMetrika'

export function useBookingMutation() {
  return useMutation<BookingResult, Error, BookingPayload>({
    mutationFn: sendBooking,
    onSuccess: () => {
      trackYandexMetrikaGoal('ym-submit-leadform')
    },
  })
}

