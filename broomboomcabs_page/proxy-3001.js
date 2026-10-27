const http = require("http");

const server = http.createServer((req, res) => {
  const options = {
    hostname: "localhost",
    port: 3000,
    path: req.url,
    method: req.method,
    headers: { ...req.headers, host: "localhost:3000" },
  };

  const proxyReq = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  proxyReq.on("error", (err) => {
    res.writeHead(502, { "Content-Type": "text/plain" });
    res.end("Bad Gateway: " + err.message);
  });

  req.pipe(proxyReq, { end: true });
});

server.listen(3001, () => {
  console.log("Port 3001 proxy to port 3000 is active");
});

