import { HttpResponse, http } from 'msw';
import { messageListRes } from '../data/message';

export const messageHandlers = [
  http.get('/messages/received', () => {
    return HttpResponse.json(messageListRes, { status: 201 });
  }),
  http.get('/messages/sent', () => {
    return HttpResponse.json(messageListRes, { status: 201 });
  }),
];
