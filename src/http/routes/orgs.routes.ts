import { FastifyInstance } from "fastify";
import { register } from "../controllers/orgs/register";
import { authenticate } from "../controllers/orgs/authenticate";

export async function orgsRoutes(app: FastifyInstance) {
  app.post("/orgs", register);
  app.post("/orgs/sessions", authenticate);
}
