/// <reference types="vite/client" />

declare module 'react-dom/client' {
  export function createRoot(
    container: Element | DocumentFragment,
    options?: { identifierPrefix?: string }
  ): { render(children: unknown): void; unmount(): void };
}
