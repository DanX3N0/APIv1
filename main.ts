import { Application } from "./deps.ts";
import { connectDB } from "./database/db.ts";
import router from "./routes/routes.ts";

const PORT = Number(Deno.env.get("PORT" )) || 3000;

const app = new Application();

connectDB();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`App running on http://localhost:${PORT}`);
app.listen({ port: PORT });