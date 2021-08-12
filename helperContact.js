export async function getContacts(client, filter) {
  const result = await client
    .db("contestants")
    .collection("contact")
    .find(filter)
    .toArray();
  console.log("Successfully connected", result);
  return result;
}

export async function insertContact(client, data) {
  const result = await client
    .db("contestants")
    .collection("contact")
    .insertOne(data);
  console.log("Inserted Successfully", result);
  return result;
}
