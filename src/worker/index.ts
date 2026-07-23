import { app } from "./app";
import { consumeTechnologyMessages } from "./routes/technology";
export default { fetch: app.fetch, queue: consumeTechnologyMessages };
