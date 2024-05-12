import { HttpResponse, http } from 'msw';
import { getCurrentLevelReq, patchLevelUpReq } from '../data/greenhouse';

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
];
