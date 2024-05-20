import { HttpResponse, http } from 'msw';
import {
  getDayStoryReq,
  postStoryExpressionReq,
  patchKeepStoryReq,
  getStoryExpression,
  getStoryExpression2,
} from '../data/story';

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

  http.patch('/stories/5', () => {
    return HttpResponse.json(patchKeepStoryReq, {
      status: 200,
    });
  }),
  http.get('/stories/5/reactions', () => {
    return HttpResponse.json(getStoryExpression, {
      status: 200,
    });
  }),

  http.get('/stories/2/reactions', () => {
    return HttpResponse.json(getStoryExpression2, {
      status: 200,
    });
  }),
];
