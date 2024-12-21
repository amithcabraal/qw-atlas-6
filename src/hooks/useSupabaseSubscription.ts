import { useEffect } from 'react';
import { RealtimeChannel } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export function useSupabaseSubscription(
  channel: string,
  event: string,
  callback: (payload: any) => void
) {
  useEffect(() => {
    let subscription: RealtimeChannel;

    const setupSubscription = async () => {
      subscription = supabase.channel(channel)
        .on('broadcast', { event }, (payload) => {
          callback(payload);
        })
        .subscribe();
    };

    setupSubscription();

    return () => {
      if (subscription) {
        supabase.removeChannel(subscription);
      }
    };
  }, [channel, event, callback]);
}