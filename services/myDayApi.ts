import { protectedApi } from './protectedApi'

export const myDayApi = {
  getMyDay: () =>
    protectedApi.get('/weeks/public/my-day'),
}