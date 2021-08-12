import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import { pollRouter } from "./routes/poll.js";
import { userRouter } from "./routes/user.js";
import { productRouter } from "./routes/product.js";
import { contactRouter } from "./routes/contact.js";
const app = express();
dotenv.config();
const PORT = process.env.PORT;
// loaded in process.env (like process.argv)

app.use(express.json());
app.use(cors());
// parse it as JSON for POST
// request -> parse json (body,post,put,patch) -> request.body

export async function createConnection() {
  const MONGO_URL = process.env.MONGO_URI;
  const client = new MongoClient(MONGO_URL);
  try {
    await client.connect();
    return client;
    // getPollById(client, "4");
  } catch (err) {
    console.log(err);
  }
}
app.get("/", (request, response) => {
  response.send("New msg");
});

app.use("/poll", pollRouter);
app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/contact", contactRouter);

app.listen(PORT, () => console.log("The server is started in: ", PORT));

// npm run dev -> to start the server
