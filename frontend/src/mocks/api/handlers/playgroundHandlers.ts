import { HttpResponse, http } from 'msw';
import { familyInfoRes } from '../data/playground';

export const playgroundHandlers = [
  http.get('/families/info', () => {
    return HttpResponse.json(familyInfoRes, { status: 201 });
  }),
];
