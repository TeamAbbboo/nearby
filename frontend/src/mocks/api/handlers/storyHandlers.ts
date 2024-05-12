import { HttpResponse, http } from 'msw';
import { getDayStoryReq, postStoryExpressionReq } from '../data/story';

export const storyHandlers = [
  http.get('/stories/day', () => {
    return HttpResponse.json(getDayStoryReq, {
      status: 200,
    });
  }),

  http.post('/stories/5/reactions', () => {
    return HttpResponse.json(postStoryExpressionReq, {
      status: 200,
    });
  }),
];
