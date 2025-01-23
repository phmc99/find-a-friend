import { PrismaOrgsRepository } from "@/repositories/orgs/prisma-orgs-repository";
import { OrgRegisterUseCase } from "@/use-cases/orgs/register";

export function makeRegiserUseCase() {
  const orgsRepository = new PrismaOrgsRepository();
  const registerUseCase = new OrgRegisterUseCase(orgsRepository);

  return registerUseCase;
}
