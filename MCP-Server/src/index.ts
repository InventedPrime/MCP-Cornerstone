/**
 * MCP Server for Cornerstone
 * All of this Was AI Generated.
 */
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import * as dotenv from "dotenv";

dotenv.config();

const server = new McpServer({
  name: "MCP-Cornerstone",
  version: "1.0.0",
});

server.registerTool(
  "get_liked_artworks",
  {
    title: "Get Liked Artworks",
    description: "Gets the artworks the user has liked from Firebase",
    inputSchema: {
      userId: z.string().describe("The Firebase user ID"),
    },
  },
  async ({ userId }) => {
    const { getLikedArtworks } = await import("./tools/getLikedArtworks");
    return await getLikedArtworks(userId);
  },
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("MCP Server running...");
}

main();
