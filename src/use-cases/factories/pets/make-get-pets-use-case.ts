import { PrismaPetsRepository } from "@/repositories/pets/prisma-pets-repository";
import { FindManyPetsUseCase } from "@/use-cases/pets/find-many-pets";

export function makeGetPetsUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const getPetProfileUseCase = new FindManyPetsUseCase(petsRepository);

  return getPetProfileUseCase;
}
