import { FastifyInstance } from "fastify";
import { orgsRoutes } from "./orgs.routes";

export async function appRoutes(app: FastifyInstance) {
  app.register(orgsRoutes, { prefix: "orgs" });
}
