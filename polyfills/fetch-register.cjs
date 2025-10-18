const {
  fetch,
  FormData,
  File,
  Headers,
  Request,
  Response,
  Blob,
} = require("undici")

if (typeof globalThis.fetch !== "function") {
  globalThis.fetch = fetch
}
if (typeof globalThis.Headers === "undefined") {
  globalThis.Headers = Headers
}
if (typeof globalThis.Request === "undefined") {
  globalThis.Request = Request
}
if (typeof globalThis.Response === "undefined") {
  globalThis.Response = Response
}
if (typeof globalThis.FormData === "undefined") {
  globalThis.FormData = FormData
}
if (typeof globalThis.File === "undefined") {
  globalThis.File = File
}
if (typeof globalThis.Blob === "undefined") {
  globalThis.Blob = Blob
}
