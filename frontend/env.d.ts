/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BIRD_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 