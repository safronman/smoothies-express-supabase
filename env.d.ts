declare namespace NodeJS {
  interface ProcessEnv {
    PORT?: string
    SUPABASE_URL: string
    SUPABASE_SERVICE_ROLE_KEY: string
  }
}
