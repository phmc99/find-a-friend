import { FastifyInstance } from "fastify";
import { register } from "../controllers/pets/register";
import { verifyJwt } from "../middlewares/verify-jwt";
import { getPets } from "../controllers/pets/get-pets";

export async function petsRoutes(app: FastifyInstance) {
  app.post("/orgs/pets", { onRequest: [verifyJwt] }, register);
  app.get("/orgs/pets", getPets);
}
