import { PrismaPetsRepository } from "@/repositories/pets/prisma-pets-repository";
import { PetRegisterUseCase } from "@/use-cases/pets/register";

export function makeRegiserUseCase() {
  const petsRepository = new PrismaPetsRepository();
  const registerUseCase = new PetRegisterUseCase(petsRepository);

  return registerUseCase;
}
