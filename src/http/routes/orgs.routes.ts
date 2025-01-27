import { FastifyInstance } from "fastify";
import { register } from "../controllers/orgs/register";
import { authenticate } from "../controllers/orgs/authenticate";
import { getOrgProfile } from "../controllers/orgs/get-org-profile";

export async function orgsRoutes(app: FastifyInstance) {
  app.post("/orgs", register);
  app.post("/orgs/sessions", authenticate);
  app.get("/orgs/:orgId", getOrgProfile);
}
