// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $_middleware from "./routes/_middleware.ts";
import * as $api_chat from "./routes/api/chat.ts";
import * as $api_joke from "./routes/api/joke.ts";
import * as $api_stream from "./routes/api/stream.tsx";
import * as $callback from "./routes/callback.tsx";
import * as $chat from "./routes/chat.tsx";
import * as $error from "./routes/error.tsx";
import * as $greet_name_ from "./routes/greet/[name].tsx";
import * as $index from "./routes/index.tsx";
import * as $login from "./routes/login.tsx";
import * as $logout from "./routes/logout.tsx";
import * as $Counter from "./islands/Counter.tsx";
import * as $Stream from "./islands/Stream.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/_middleware.ts": $_middleware,
    "./routes/api/chat.ts": $api_chat,
    "./routes/api/joke.ts": $api_joke,
    "./routes/api/stream.tsx": $api_stream,
    "./routes/callback.tsx": $callback,
    "./routes/chat.tsx": $chat,
    "./routes/error.tsx": $error,
    "./routes/greet/[name].tsx": $greet_name_,
    "./routes/index.tsx": $index,
    "./routes/login.tsx": $login,
    "./routes/logout.tsx": $logout,
  },
  islands: {
    "./islands/Counter.tsx": $Counter,
    "./islands/Stream.tsx": $Stream,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
