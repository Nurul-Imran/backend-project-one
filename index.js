// Create Http Server
const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 4000;
const hostName = '127.0.0.1';

const server = http.createServer((req, res) => {
    //Routes
    const routes = {
        '/': 'index.html',
        '/about': 'about.html',
        '/contact': 'contact.html'
    }
    const fileName = routes[req.url] || 'error.html';
    const statusCode = routes[req.url] ? 200 : 404;
    const filePath = path.join(__dirname, 'view', fileName);

    const handleReadFile = (filePath, statusCode) => {
        fs.readFile(filePath, (err, data) => {
            if(err){
                res.writeHead(500, {'Content-Type': 'text/html'});
                res.write("<h1>Internal Server Error</h1>");
                return res.end();
            }
            res.writeHead(statusCode, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        })
    }
    handleReadFile(filePath, statusCode);
});

server.listen(port, hostName, () => {
    console.log(`Server running successfully at http://${hostName}:${port}`);
});