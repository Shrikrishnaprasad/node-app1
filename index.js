import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
const app = express();

dotenv.config();
const PORT = process.env.PORT;
// loaded in process.env (like process.argv)

async function createConnection() {
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
async function getPollById(client, id) {
  const result = await client
    .db("contestants")
    .collection("poll")
    .findOne({ id: id });
  console.log("Successfully connected", result);
  return result;
}
async function getPollByName(client, company) {
  const result = await client
    .db("contestants")
    .collection("poll")
    .findOne({ company: company });
  console.log("Successfully connected", result);
  return result;
}
async function getPollByColor(client, color) {
  const result = await client
    .db("contestants")
    .collection("poll")
    .findOne({ color: color });
  console.log("Successfully connected", result);
  return result;
}
async function getPollByContent(client, content) {
  const result = await client
    .db("contestants")
    .collection("poll")
    .find({ content: { $regex: content, $options: "i" } })
    .toArray();
  console.log("Successfully connected", result);
  return result;
}

async function getPolls(client, filter) {
  const result = await client
    .db("contestants")
    .collection("poll")
    .find(filter)
    .toArray();
  console.log("Successfully connected", result);
  return result;
}
createConnection();
async function insertPoll(client) {
  const result = await client.db("contestants").collection("poll").insertOne({
    company: "new",
    color: "new",
    content: "new content",
    id: 8,
  });
  console.log("Inserted Successfully", result);
}
app.get("/", (request, response) => {
  response.send("New msg");
});

app.get("/poll", async (request, response) => {
  const client = await createConnection();
  const poll = await getPolls(client, {});
  response.send(poll);
});

app.get("/poll/:id", async (request, response) => {
  const id = JSON.parse(request.params.id);
  const client = await createConnection();
  const res = await getPollById(client, id);
  //const res = poll.filter((data) => data.id === id);
  response.send(res);
});

app.get("/poll/name/:company", async (request, response) => {
  const company = request.params.company;
  const client = await createConnection();
  const res = await getPollByName(client, company);
  response.send(res);
});
app.get("/poll/color/:color", async (request, response) => {
  const color = request.params.color;
  const client = await createConnection();
  const res = await getPollByColor(client, color);
  response.send(res);
});
app.get("/poll/content/:search", async (request, response) => {
  const search = request.params.search;
  const client = await createConnection();
  const res = await getPolls(client, {
    content: { $regex: search, $options: "i" },
  });
  response.send(res);
});
console.log("...");
app.listen(PORT, () => console.log("The server is started in: ", PORT));
