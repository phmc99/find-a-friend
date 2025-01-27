import { FastifyInstance } from "fastify";
import { register } from "../controllers/pets/register";
import { verifyJwt } from "../middlewares/verify-jwt";
import { getPets } from "../controllers/pets/get-pets";
import { getPetProfile } from "../controllers/pets/get-pet-profile";

export async function petsRoutes(app: FastifyInstance) {
  app.post("/orgs/pets", { onRequest: [verifyJwt] }, register);
  app.get("/orgs/pets", getPets);
  app.get("/orgs/pets/:petId", getPetProfile);
}
