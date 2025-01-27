import { makeGetPetsUseCase } from "@/use-cases/factories/pets/make-get-pets-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getPets(req: FastifyRequest, rep: FastifyReply) {
  const paramsSchema = z.object({
    city: z.string(),
    age: z.string().optional(),
    size: z.string().optional(),
    energy: z.string().optional(),
    environment: z.string().optional(),
    independence: z.string().optional(),
  });

  const getPetsParams = paramsSchema.parse(req.query);

  try {
    const getPetsUseCase = makeGetPetsUseCase();

    const pets = await getPetsUseCase.execute(getPetsParams);

    return rep.status(200).send(pets);
  } catch (error) {
    throw error;
  }
}
