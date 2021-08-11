import mongodb from "mongodb";
export async function getProductById(client, id) {
  const result = await client
    .db("contestants")
    .collection("product")
    .findOne({ _id: new mongodb.ObjectId(id) });
  console.log("Successfully connected", result);
  return result;
}
export async function deleteProductById(client, id) {
  const result = await client
    .db("contestants")
    .collection("product")
    .deleteOne({ _id: new mongodb.ObjectId(id) });
  console.log("Successfully connected", result);
  return result;
}
export async function getProducts(client, filter) {
  const result = await client
    .db("contestants")
    .collection("product")
    .find(filter)
    .toArray();
  console.log("Successfully connected", result);
  return result;
}
export async function insertProducts(client, products) {
  const result = await client
    .db("contestants")
    .collection("product")
    .insertMany(products);
  console.log("Inserted Successfully", result);
  return result;
}
export async function insertProduct(client, products) {
  const result = await client
    .db("contestants")
    .collection("product")
    .insertOne(products);
  console.log("Inserted Successfully", result);
  return result;
}
export async function updateProduct(client, id, newProduct) {
  const result = await client
    .db("contestants")
    .collection("product")
    .updateOne({ _id: new mongodb.ObjectId(id) }, { $set: newProduct });
  console.log("Updated Successfully", result);
  return result;
}
