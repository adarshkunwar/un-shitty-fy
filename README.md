# UN_SHITTY_FY

Early scaffold for a Node/TypeScript CLI that will clean duplicated, unreachable, and oversized code.

## Getting started

```sh
npm install
npm run dev -- --help   # run the CLI in dev mode
npm test                # run vitest suite
npm run build           # emit dist/ CLI bundle
```

The CLI currently provides a stub scan command; upcoming steps will wire real analyzers and autofixers.
