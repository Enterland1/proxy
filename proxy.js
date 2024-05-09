const http = require('http');
const httpProxy = require('http-proxy');

// Create a proxy server instance
const proxy = httpProxy.createProxyServer({});

// Create a basic HTTP server
const server = http.createServer((req, res) => {
    // Log the request
    console.log(`Received request for: ${req.url}`);

    // Forward the request to the target server
    proxy.web(req, res, { target: 'http://youtube.com' });
});

// Handle errors
proxy.on('error', (err, req, res) => {
    console.error('Proxy error:', err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Proxy error occurred.');
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Proxy server is listening on port ${PORT}`);
});
