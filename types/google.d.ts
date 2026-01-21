export {}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (options: {
            client_id: string
            callback: (response: { credential: string }) => void
          }) => void
          renderButton: (
            element: HTMLElement | null,
            options: {
              theme?: string
              size?: string
              text?: string
              width?: number
              shape?: string
            }
          ) => void
          disableAutoSelect?: () => void
        }
      }
    }
  }
}
