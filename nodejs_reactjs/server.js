import http from "http";
import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "./App.js";

const server = http.createServer((req, res) => {
  const appHTML = ReactDOMServer.renderToString();

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Pure React SSR</title>
      </head>
      <body>
        <div id="root">${appHTML}</div>
        <script type="module" src="/client.js"></script>
      </body>
    </html>
  `;

  res.writeHead(200, { "Content-Type": "text/html" });
  res.end(html);
});

server.listen(3000, () => {
  console.log("SSR running at http://localhost:3000");
});
