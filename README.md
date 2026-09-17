# Yume

Yume is a TypeScript SDK for finding anime and manga, resolving playable media, and downloading the result. It provides a common interface for several external content sites, so the rest of an application does not need to know how each site works.

The public entry point is `src/index.ts`. It re-exports the SDK's types and the main modules. The types in `src/types.ts` describe searches, episodes or chapters, streams, subtitles, metadata, and downloads. Provider-specific IDs are wrapped in a small `provider:id` format so that IDs from different services do not get mixed up.

The content providers are in `src/providers`. Each provider implements the same `BaseProvider` interface for searching, listing content units, and resolving streams. Providers may use extractors from `src/extractors` when a site points to another video host. The extractors handle those host-specific pages and return a shared video format. Manga providers return page URLs instead.

The metadata layer is in `src/meta`. Its AniList, MAL, and Kitsu providers return normalized title information. `MappingClient` connects that information to a content provider, which lets an application use a metadata title to find its episodes or chapters on another service.

Requests go through the transport code in `src/transport`. It contains the HTTP client, retries, rate limiting, DOM parsing, and HLS helpers used by providers. `src/utils` contains small shared helpers for validation, IDs, subtitles, and signing. `src/download` turns resolved video or manga data into local files.

`src/server.ts` provides an optional HTTP server around the SDK. It exposes health and OpenAPI endpoints, search, content, stream and track resolution, metadata routes, downloads, and an optional proxy for media that needs request headers. Applications that only need the library can use the exported classes directly.

GraphQL documents and generated client types live in `src/graphql`. The code generation configuration is in `codegen.ts`.

Use `bun run build` to build the package and generate declaration files. Use `bun run test:run` for the complete test suite, or `bun test` while developing. The unit tests cover shared behavior, and the tests in `tests/e2e` exercise providers and larger request flows.
