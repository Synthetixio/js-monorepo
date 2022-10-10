#!/usr/bin/env node

const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const BASE_DIR = path.join(__dirname, './out');

const mimeTypes = {
  html: 'text/html',
  css: 'text/css',
  json: 'application/json',
  png: 'image/png',
  gif: 'image/gif',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  webp: 'image/webp',
  woff: 'font/woff',
  woff2: 'font/woff2',
  js: 'text/javascript',
  ico: 'image/vnd.microsoft.icon',
  svg: 'image/svg+xml',
};

const index = fs.readFileSync(`${BASE_DIR}/index.html`, 'utf8');
const cache = {};
function send(response, cached) {
  response.setHeader('Content-Type', cached.type);
  response.writeHead(200);
  response.end(cached.data);
}

// Create a server
const httpServer = http.createServer((request, response) => {
  const { pathname } = url.parse(request.url);
  console.log(request.method, request.url);
  if (pathname in cache) {
    return send(response, cache[pathname]);
  }

  fs.readFile(`${BASE_DIR}${pathname}`, (error, data) => {
    if (!error) {
      const ext = `${pathname.split('.').pop()}`.toLowerCase();
      cache[pathname] = { type: mimeTypes[ext], data };
      return send(response, cache[pathname]);
    }
    cache[pathname] = { type: 'text/html', data: index };
    return send(response, cache[pathname]);
  });
});

httpServer.listen(3000, '0.0.0.0', () => console.log(`Server is running at http://127.0.0.1:3000`));
