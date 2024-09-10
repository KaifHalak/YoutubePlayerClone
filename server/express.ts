import express  from "express";
import http from "http"
import cors from "cors"
import path from "path"

const app = express();
const server = http.createServer(app);

app.set('view engine', 'ejs');
app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname, 'Videos')));
let PORT = 3000

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
  });


export default app
