const http = require("http");
const fs = require("fs");
const PORT = 3000

const server = http.createServer((req, res)=>{
    res.writeHead(200, {"content-type": 'text/html'});
    if(req.url === "/") {
        fs.readFile("page/home.html", "utf-8", (err, data)=>{
            console.log(data);
            if(err) throw err;
            res.write(data);
            res.end();
        })
    }
    else if(req.url === "/create-file") {
        res.writeHead(201, {"content-type": 'text/html'})
        fs.writeFile("temp/test.html", "<h1>This is test file</h1>", (err, data)=>{
            console.log(data);
            if(err) throw err;
            res.write("File is created");
            res.end();
        })
    } 
    else if(req.url === "/about") {
        res.writeHead(200, {"content-type": 'text/html'})
        res.write("<h1>About Page</h1>");
        res.end();
    } else {
        res.writeHead(404, {"content-type": "text/html"})
        res.write("<h1>Page not found</h1>");
        res.end();
    }
})


console.log(`Server is running at https://localhost:${PORT}`);
server.listen(PORT);