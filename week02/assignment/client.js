const net = require("net"); // a TCP lib

class Request {
    constructor(options){
        this.method = options.method || "GET"; // why ||? ensure the Null is replaced by a default value.
        this.host = options.host;
        this.port = options.port || 80;
        this.path = options.path || "/";
        this.body = options.body || {};
        this.headers = options.headers || {};
        if(!this.headers["Content-Type"]) {
            this.headers["Content-Type"] = "application/x-www-form-urlencoded"; // essential field in a HTTP message 
        }
        
        if(this.headers["Content-Type"] === "application/json"){
            this.bodyText = JSON.stringify(this.body);
        } else if (this.headers["Content-Type"] === "application/x-www-form-urlencoded"){
            this.bodyText = Object.keys(this.body)
                            .map( (key) => {
                                    return `${key}=${encodeURIComponent(this.body[key])}`
                                })
                            .join("&");
        }
        this.headers["Content-Length"] = this.bodyText.length;
    }

    send(connection){ // The parameter connection is a constructed TCP connection.
        return new Promise((resolve, reject) => {
            const parser = new ResponseParser;
            console.log(this.toString());
            if(connection){
                connection.write(this.toString());
            } else {
                connection = net.createConnection({host: this.host, port: this.port}, 
                    () => { connection.write(this.toString());} // A callback function when the connection is created successfully
                    );
            }
            connection.on('data', (data) => { // listen to the connection's data field
                console.log(data.toString());
                parser.receive(data.toString());
                if(parser.isFinished){
                    resolve(parser.response);
                    connection.end();
                }
            });
            connection.on('error', (err) => {
                reject(err);
                connection.end();
            });
        });
    }

    toString(){
        return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}\r
\r
${this.bodyText}`;
    }
}

class ResponseParser{
    constructor(){
    }
    receive(string){
        for(let i = 0; i<string.length; i++){
            this.receiveChar(string.chatAt(i));
        }
    }

    receiveChar(char){
        
    }
}

void async function(){ // async? void?
    let request = new Request({
        method: "POST",
        host: "127.0.0.1",
        port: "8088",
        path: "/",
        headers: {
            ["X-Foo2"]: "customed" // array can be a key?
        }, 
        body: {
            name: "weijing"
        }
    });
    console.dir(request);

    let response = await request.send(); // await? 
    console.log(response);
}();
