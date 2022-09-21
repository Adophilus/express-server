declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string
      APPS_PATH?: string
    }
  }
}
