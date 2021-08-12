import express from "express";
import { getContacts, insertContact } from "../helperContact.js";
import { createConnection } from "../index.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();

router
  .route("/")
  .get(async (request, response) => {
    const client = await createConnection();
    const res = await getContacts(client, {});
    response.send(res);
  })
  .post(async (request, response) => {
    const client = await createConnection();
    const product = request.body;
    //console.log(product);
    // request -> parse json (body,post,put,patch) -> request.body
    const res = await insertContact(client, product);
    response.send({ res, message: "Request send !" });
  });

export const contactRouter = router;
