export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      games: {
        Row: {
          id: string
          code: string
          status: 'waiting' | 'playing' | 'finished'
          current_question: number
          host_id: string
          created_at: string
        }
        Insert: {
          id?: string
          code: string
          status: 'waiting' | 'playing' | 'finished'
          current_question?: number
          host_id: string
          created_at?: string
        }
        Update: {
          id?: string
          code?: string
          status?: 'waiting' | 'playing' | 'finished'
          current_question?: number
          host_id?: string
          created_at?: string
        }
      }
      players: {
        Row: {
          id: string
          game_id: string
          initials: string
          score: number
          has_answered: boolean
          created_at: string
        }
        Insert: {
          id?: string
          game_id: string
          initials: string
          score?: number
          has_answered?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          game_id?: string
          initials?: string
          score?: number
          has_answered?: boolean
          created_at?: string
        }
      }
      answers: {
        Row: {
          id: string
          game_id: string
          player_id: string
          question_id: number
          latitude: number
          longitude: number
          distance: number
          score: number
          created_at: string
        }
        Insert: {
          id?: string
          game_id: string
          player_id: string
          question_id: number
          latitude: number
          longitude: number
          distance: number
          score: number
          created_at?: string
        }
        Update: {
          id?: string
          game_id?: string
          player_id?: string
          question_id?: number
          latitude?: number
          longitude?: number
          distance?: number
          score?: number
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
