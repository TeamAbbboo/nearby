import { authHandlers } from './api/handlers/authHandlers';
import { messageHandlers } from './api/handlers/messageHandlers';

export const handlers = [...authHandlers, ...messageHandlers];
