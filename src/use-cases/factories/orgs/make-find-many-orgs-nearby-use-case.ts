import { PrismaOrgsRepository } from "@/repositories/orgs/prisma-orgs-repository";
import { FetchNearbyOrgsUseCase } from "@/use-cases/orgs/find-many-orgs-nearby";

export function makeFetchNearbyUseCase() {
  return new FetchNearbyOrgsUseCase(new PrismaOrgsRepository());
}
