import express from "express";
import {
  getProducts,
  deleteProductById,
  getProductById,
  updateProduct,
  insertProducts,
  insertProduct,
} from "../helperProduct.js";
import { createConnection } from "../index.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();

router
  .route("/")
  .get(auth, async (request, response) => {
    const client = await createConnection();
    const res = await getProducts(client, {});
    response.send(res);
  })
  .post(auth, async (request, response) => {
    const client = await createConnection();
    const product = request.body;
    console.log(product);
    // request -> parse json (body,post,put,patch) -> request.body
    const res = await insertProducts(client, product);
    response.send(res);
  });

router.route("/add").post(auth, async (request, response) => {
  const client = await createConnection();
  const product = request.body;
  console.log(product);
  // request -> parse json (body,post,put,patch) -> request.body
  const res = await insertProduct(client, product);
  response.send(res);
});

router
  .route("/:id")
  .delete(auth, async (request, response) => {
    const id = request.params.id;
    const client = await createConnection();
    const res = await deleteProductById(client, id);
    response.send(res);
  })
  .get(auth, async (request, response) => {
    //const id = JSON.parse(request.params.id);
    const id = request.params.id;
    const client = await createConnection();
    const res = await getProductById(client, id);
    response.send(res);
  })
  .put(auth, async (request, response) => {
    const id = request.params.id;
    const client = await createConnection();
    const newProduct = request.body;
    // request -> parse json (body,post,put,patch) -> request.body
    const res = await updateProduct(client, id, newProduct);
    response.send(res);
  });

export const productRouter = router;
