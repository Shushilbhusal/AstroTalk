import dotenv from "dotenv";
import cors from "cors"
dotenv.config();


import express from "express";
import { Router } from "express";
import { graph } from "./controller/langGraph.js";

const app = express();
const router = Router();
const PORT = 4000;

/* ---------- middleware ---------- */
app.use(express.json());
app.use(cors({
    origin:"https://astro-talk-shushil.vercel.app/"
}))
/* ---------- routes ---------- */
router.get("/", (req, res)=>{
  res.send("hello world")
})

// test route
router.get("/test", (req, res) => {
  res.json({ status: "OK" });
});

router.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "message is required" });
    }

    const finalState = await graph.invoke(
      {
        messages: [{ role: "user", content: message }],
      },
      {
        configurable: { thread_id: "hari-thread" },
      },
    );

    const lastMessage = finalState.messages[finalState.messages.length - 1];

    res.json({ reply: lastMessage.content, role: "AI" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/* ---------- mount router ---------- */
app.use("/api", router);

/* ---------- start server ---------- */
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
