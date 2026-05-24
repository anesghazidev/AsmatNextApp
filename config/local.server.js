import Server from "./server.js"

const port = parseInt(process.env.PORT || '3000')
const url = Server(port, "local", process.env.LOCAL_NODE_ENV)