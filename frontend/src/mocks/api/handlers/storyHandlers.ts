import { HttpResponse, http } from 'msw';
import { getDayStoryReq } from '../data/story';

export const storyHandlers = [
  http.get('/stories/day', () => {
    return HttpResponse.json(getDayStoryReq, {
      status: 200,
    });
  }),
];
