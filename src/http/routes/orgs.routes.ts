import { FastifyInstance } from "fastify";
import { register } from "../controllers/orgs/register";
import { authenticate } from "../controllers/orgs/authenticate";

export async function orgsRoutes(app: FastifyInstance) {
  app.post("/", register);
  app.post("/sessions", authenticate);
}
