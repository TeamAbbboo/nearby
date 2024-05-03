import { authHandlers } from './api/handlers/authHandlers';
import { familyHandlers } from './api/handlers/familyHandlers';
import { messageHandlers } from './api/handlers/messageHandlers';

export const handlers = [...authHandlers, ...familyHandlers, ...messageHandlers];
