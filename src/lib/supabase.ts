import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = 'https://xvetklxeulicbyepkqco.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh2ZXRrbHhldWxpY2J5ZXBrcWNvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA2NzU1NTAsImV4cCI6MjA0NjI1MTU1MH0.1uDzP9CmhS6OoRMdUHCmcsCNnJWCJwuk6nsyJdU0mbw';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: true
  },
  db: {
    schema: 'public'
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});
