import { FastifyInstance } from "fastify";
import { register } from "../controllers/orgs/register";
import { authenticate } from "../controllers/orgs/authenticate";
import { getOrgProfile } from "../controllers/orgs/get-org-profile";
import { refresh } from "../controllers/orgs/refresh";
import { fetchNearbyOrgsController } from "../controllers/orgs/find-many-orgs-nearby";

export async function orgsRoutes(app: FastifyInstance) {
  app.post("/orgs", register);
  app.get("/orgs", fetchNearbyOrgsController);
  app.post("/orgs/sessions", authenticate);
  app.get("/orgs/:orgId", getOrgProfile);
  app.patch("/token/refresh", refresh);
}
