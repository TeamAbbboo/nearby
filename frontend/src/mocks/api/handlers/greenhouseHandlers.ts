import { HttpResponse, http } from 'msw';
import { getCurrentLevelReq, getExpHistoryListRes, patchLevelUpReq } from '../data/greenhouse';

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
];
