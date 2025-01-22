import { OrgAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { PrismaOrgsRepository } from "@/repositories/orgs/prisma-orgs-repository";
import { OrgRegisterUseCase } from "@/use-cases/orgs/register";
import { error } from "console";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { OrgAuthUseCase } from "@/use-cases/orgs/authenticate";
import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";

export async function authenticate(req: FastifyRequest, rep: FastifyReply) {
  const authBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const registerBody = authBodySchema.parse(req.body);

  try {
    const orgsRepository = new PrismaOrgsRepository();
    const authUseCase = new OrgAuthUseCase(orgsRepository);
    await authUseCase.execute(registerBody);
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return rep.status(400).send({ message: error.message });
    }

    throw error;
  }

  return rep.status(200).send();
}
