import { FastifyInstance } from "fastify";
import { register } from "../controllers/pets/register";
import { verifyJwt } from "../middlewares/verify-jwt";

export async function petsRoutes(app: FastifyInstance) {
  app.post("/orgs/pets", { onRequest: [verifyJwt] }, register);
}
