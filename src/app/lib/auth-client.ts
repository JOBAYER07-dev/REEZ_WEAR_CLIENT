import { createAuthClient } from 'better-auth/react';
import { adminClient } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
  baseURL: 'https://reez-wear-server.onrender.com', 
  plugins: [adminClient()],
});
