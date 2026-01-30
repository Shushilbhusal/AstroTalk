// Load env FIRST
import dotenv from "dotenv";
dotenv.config();

// LangGraph core
import { StateGraph, MessagesAnnotation } from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { MemorySaver } from "@langchain/langgraph";

// LLM
import { ChatGroq } from "@langchain/groq";

// Tool
import { TavilySearch } from "@langchain/tavily";

/* ---------------- TOOLS ---------------- */

// Initialize Tavily
const tavilyTool = new TavilySearch({
  maxResults: 3,
  topic: "general",
});

const tools = [tavilyTool];

/* ---------------- LLM ---------------- */

const llm = new ChatGroq({
  model: "llama-3.1-8b-instant",
  temperature: 0,
  maxRetries: 2,
}).bindTools(tools);

/* ---------------- MEMORY ---------------- */

const checkpointer = new MemorySaver();

/* ---------------- TOOL NODE ---------------- */

const toolNode = new ToolNode(tools);

/* ---------------- AGENT NODE ---------------- */

async function callModel(state) {
  const response = await llm.invoke(state.messages);
  return { messages: [response] };
}

/* ---------------- ROUTING LOGIC ---------------- */

function shouldContinue(state) {
  const lastMessage = state.messages[state.messages.length - 1];

  if (lastMessage.tool_calls && lastMessage.tool_calls.length > 0) {
    return "toolNode";
  }

  return "__end__";
}

/* ---------------- GRAPH ---------------- */

const workflow = new StateGraph(MessagesAnnotation)
  .addNode("agent", callModel)
  .addNode("toolNode", toolNode)
  .addEdge("__start__", "agent")
  .addEdge("toolNode", "agent")
  .addConditionalEdges("agent", shouldContinue);

/* ---------------- EXPORT ---------------- */

export const graph = workflow.compile({ checkpointer });
