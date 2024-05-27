import { authHandlers } from './api/handlers/authHandlers';
import { familyHandlers } from './api/handlers/familyHandlers';
import { greenhouseHandlers } from './api/handlers/greenhouseHandlers';
import { messageHandlers } from './api/handlers/messageHandlers';
import { playgroundHandlers } from './api/handlers/playgroundHandlers';
import { storyHandlers } from './api/handlers/storyHandlers';

export const handlers = [
  ...authHandlers,
  ...familyHandlers,
  ...messageHandlers,
  ...playgroundHandlers,
  ...greenhouseHandlers,
  ...storyHandlers,
];
