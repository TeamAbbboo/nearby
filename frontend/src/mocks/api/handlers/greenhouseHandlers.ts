import { HttpResponse, http } from 'msw';
import { getCurrentLevelReq, patchLevelUpReq } from '../data/greenhouse';

export const greenhouseHandlers = [
  http.get('/level', () => {
    return HttpResponse.json(getCurrentLevelReq, {
      status: 200,
    });
  }),

  http.patch('/level', () => {
    const success = HttpResponse.json(patchLevelUpReq, {
      status: 200,
    });
    return success;
  }),
];
