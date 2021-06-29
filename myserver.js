const http = require('http');

const hostname = '0.0.0.0'; // listen on all ports
const port = 3311;

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World');
}).listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
