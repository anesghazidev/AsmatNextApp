import Server from "./server.js"

const port = parseInt(process.env.PORT || '3000', 10)

const url = Server(port, "http", process.env.NODE_ENV)