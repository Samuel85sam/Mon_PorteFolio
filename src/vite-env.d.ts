/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_API_HOST: string
    readonly VITE_STATIC_HOST: string
}
interface ImportMeta {
    readonly env: ImportMetaEnv
}