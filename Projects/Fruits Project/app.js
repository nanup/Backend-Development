const { MongoClient } = require("mongodb");

const client = new MongoClient("mongodb://localhost:27017");

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Connected successfully to server");

    const database = client.db("fruitsDB");

    const fruits = database.collection("fruits");

    const doc = [{
        name: "banana",
        color: "yellow"
    },
    {
        name: "apple",
        color: "red"
    },
    {
        name: "pineapple",
        color:"mixed"
    }];

    const cursor = fruits.find({});

    await cursor.forEach(console.log);

  } finally {
    await client.close();
  }
}

run().catch(console.dir);