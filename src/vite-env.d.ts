/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CONTACT_API_URL?: string
  readonly VITE_CONTACT_FORM_ENDPOINT?: string
  readonly VITE_YANDEX_METRIKA_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
