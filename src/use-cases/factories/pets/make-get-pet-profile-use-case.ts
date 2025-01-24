import { PrismaPetsRepository } from "@/repositories/pets/prisma-pets-repository";
import { GetPetProfileUseCase } from "@/use-cases/pets/get-pet-profile";

export function makeGetPetProfileUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const getPetProfileUseCase = new GetPetProfileUseCase(petsRepository);

  return getPetProfileUseCase;
}
