import { HttpResponse, http } from 'msw';
import { receivedMessageListRes, sentMessageListRes, postMessageSendRes, getUnReadMessageRes } from '../data/message';

export const messageHandlers = [
  http.get('/messages/received', () => {
    return HttpResponse.json(receivedMessageListRes, { status: 201 });
  }),
  http.get('/messages/sent', () => {
    return HttpResponse.json(sentMessageListRes, { status: 201 });
  }),
  http.post('/messages', ({ request }) => {
    console.log(request);
    return HttpResponse.json(postMessageSendRes, { status: 201 });
  }),
  http.get('/messages/unread', () => {
    return HttpResponse.json(getUnReadMessageRes, { status: 201 });
  }),
];
