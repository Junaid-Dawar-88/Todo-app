import { serve } from "bun";
import index from './index.html'
import { TodoRouter } from "./routes/TodoRouter";
const server = serve({
     port: 4000,
  routes: {
    "/*": index,
     ...TodoRouter
  },

  development: process.env.NODE_ENV !== "production" && {
    hmr: true,
    console: true,
  },
});
console.log(`Server running at ${server.url}`);
