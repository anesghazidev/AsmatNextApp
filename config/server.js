import { createServer } from 'http'
import next from 'next'

export default function Server(port, type, dotenv_var){
  const http = type === "http"
  const dev  = dotenv_var !== 'production'
  const app  = next({ dev })
  const handle = app.getRequestHandler()

  app.prepare().then(() => {
    createServer((req, res) => {
      handle(req, res)
    }).listen(port, () => {
      console.log(`> Server listening at http://${http ? "127.0.0.1" : "localhost"}:${port} (${dev ? 'dev' : 'prod'})`)
    })
  })
}