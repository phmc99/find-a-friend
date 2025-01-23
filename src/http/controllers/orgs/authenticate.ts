import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { makeAuthenticateUseCase } from "@/use-cases/factories/orgs/make-authenticate-use-case";

export async function authenticate(req: FastifyRequest, rep: FastifyReply) {
  const authBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const registerBody = authBodySchema.parse(req.body);

  try {
    const authUseCase = makeAuthenticateUseCase();
    await authUseCase.execute(registerBody);
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return rep.status(400).send({ message: error.message });
    }

    throw error;
  }

  return rep.status(200).send();
}
