import { PrismaOrgsRepository } from "@/repositories/orgs/prisma-orgs-repository";
import { GetOrgProfileUseCase } from "@/use-cases/orgs/get-org-profile";

export function makeGetOrgProfileUseCase() {
  const orgsRepository = new PrismaOrgsRepository();
  const getOrgProfileUseCase = new GetOrgProfileUseCase(orgsRepository);

  return getOrgProfileUseCase;
}
