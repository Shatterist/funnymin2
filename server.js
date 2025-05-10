const http = require("http");
const url = require("url");
const fs = require("fs").promises;

const port = process.env.PORT || 8080;
const bansPath = "./bans.json"

async function getFile(path) {
    try {
        const data = await fs.readFile(path);
        return data;
    } catch (error) {
        return null;
    }
}

const server = http.createServer(async function (request, response) {
    if (request.url === "/getbans") {
        const data = await getFile(bansPath)
        if (!data) {
             response.writeHead(404, {"Content-Type": "text/html"})
             return response.end("Error, bans.json not found.")
        }
        response.writeHead(200, {"Content-Type": "application/json"})
        response.write(data)
        return response.end()
    }
    else if (request.url == "/ban" && request.method == "POST") {
        let body = '';

        request.on('data', chunk => {
            body += chunk;
        });

        response.write(body)
        return response.end()
    }
    response.writeHead(200, {"Content-Type": "text/html"})
    response.end("funny min!!!!")
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
