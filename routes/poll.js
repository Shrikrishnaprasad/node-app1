import express from "express";
import {
  getPolls,
  insertPoll,
  deletePollById,
  getPollById,
  getPollByName,
  getPollByColor,
  updatePoll,
} from "../helper.js";
import { createConnection } from "../index.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();
// replaced app -> to router & removed the poll/ word (pollRouter is starting with poll)
router
  .route("/")
  .get(auth, async (request, response) => {
    const client = await createConnection();
    const res = await getPolls(client, {});
    response.send(res);
  })
  .post(auth, async (request, response) => {
    const client = await createConnection();
    const polls = request.body;
    console.log(polls);
    // request -> parse json (body,post,put,patch) -> request.body
    const res = await insertPoll(client, polls);
    response.send(res);
  });

router
  .route("/:id")
  .delete(auth, async (request, response) => {
    const id = request.params.id;
    const client = await createConnection();
    const res = await deletePollById(client, +id);
    response.send(res);
  })
  .get(auth, async (request, response) => {
    //const id = JSON.parse(request.params.id);
    const id = request.params.id;
    const client = await createConnection();
    const res = await getPollById(client, +id);
    //const res = poll.filter((data) => data.id === id);
    response.send(res);
  })
  .patch(auth, async (request, response) => {
    const id = request.params.id;
    const client = await createConnection();
    const newPoll = request.body;
    // request -> parse json (body,post,put,patch) -> request.body
    const res = await updatePoll(client, +id, newPoll);
    response.send(res);
  });
router.get("/name/:company", auth, async (request, response) => {
  const company = request.params.company;
  const client = await createConnection();
  const res = await getPollByName(client, company);
  response.send(res);
});
router.get("/color/:color", auth, async (request, response) => {
  const color = request.params.color;
  const client = await createConnection();
  const res = await getPollByColor(client, color);
  response.send(res);
});
router.get("/content/:search", auth, async (request, response) => {
  const search = request.params.search;
  const client = await createConnection();
  const res = await getPolls(client, {
    content: { $regex: search, $options: "i" },
  });
  response.send(res);
});

export const pollRouter = router;
