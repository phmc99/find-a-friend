import { makeRegiserUseCase } from "@/use-cases/factories/pets/make-register-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(req: FastifyRequest, rep: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    age: z.string(),
    size: z.string(),
    energy: z.string(),
    environment: z.string(),
    independence: z.string(),
  });

  const registerBody = registerBodySchema.parse(req.body);

  try {
    const registerUseCase = makeRegiserUseCase();

    const petData = { ...registerBody, org_id: req.user.sub };

    await registerUseCase.execute(petData);
  } catch (error) {
    throw error;
  }
  return rep.status(201).send();
}
