import { authHandlers } from './api/handlers/authHandlers';
import { familyHandlers } from './api/handlers/familyHandlers';
import { messageHandlers } from './api/handlers/messageHandlers';
import { greenhouseHandlers } from './api/handlers/greenhouseHandlers';

export const handlers = [...authHandlers, ...familyHandlers, ...messageHandlers, ...greenhouseHandlers];
