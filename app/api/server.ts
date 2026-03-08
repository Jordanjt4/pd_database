import express from "express";
import { getEvents } from "../../src/db/queries";
import sync from "../../scripts/sync-csv";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/events", (req, res) => {
  const events = getEvents();
  res.json(events);
})

app.post("/events/sync", async (req, res) => {
  try {
    await sync();
    res.status(200).json({ message: "Sync complete" });
  } catch (error) {
    res.status(500).json({ message: "Sync failed", error });
  }
});

app.listen(3000, () => {
  console.log("API is running on port 3000");
});