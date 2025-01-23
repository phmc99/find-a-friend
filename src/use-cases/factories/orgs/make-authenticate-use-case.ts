import { PrismaOrgsRepository } from "@/repositories/orgs/prisma-orgs-repository";
import { OrgAuthUseCase } from "@/use-cases/orgs/authenticate";

export function makeAuthenticateUseCase() {
  const orgsRepository = new PrismaOrgsRepository();
  const authUseCase = new OrgAuthUseCase(orgsRepository);

  return authUseCase;
}
