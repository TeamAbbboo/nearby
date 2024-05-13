import { HttpResponse, http } from 'msw';
import { getCurrentLevelReq, getExpHistoryListRes, patchLevelUpReq, getMonthlyStoryListRes } from '../data/greenhouse';

export const greenhouseHandlers = [
  http.get('/exp/level', () => {
    return HttpResponse.json(getCurrentLevelReq, {
      status: 200,
    });
  }),

  http.patch('/exp/level', () => {
    const success = HttpResponse.json(patchLevelUpReq, {
      status: 200,
    });
    return success;
  }),

  http.get('/exp', () => {
    return HttpResponse.json(getExpHistoryListRes, {
      status: 200,
    });
  }),

  http.get('/stories/monthly?year=2024&month=5&size=1', () => {
    return HttpResponse.json(getMonthlyStoryListRes, {
      status: 200,
    });
  }),
];
