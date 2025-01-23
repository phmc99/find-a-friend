import { OrgAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeRegiserUseCase } from "@/use-cases/factories/orgs/make-register-use-case";

export async function register(req: FastifyRequest, rep: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    author: z.string(),
    email: z.string().email(),
    whatsapp: z.string(),
    password: z.string().min(6),
    cep: z.string(),
    state: z.string(),
    city: z.string(),
    neighborhood: z.string(),
    street: z.string(),
    number: z.string(),
    complement: z.string(),
    lat: z.number(),
    lon: z.number(),
  });

  const registerBody = registerBodySchema.parse(req.body);

  try {
    const registerUseCase = makeRegiserUseCase();
    await registerUseCase.execute(registerBody);
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return rep.status(409).send();
    }

    throw error;
  }

  return rep.status(201).send();
}
