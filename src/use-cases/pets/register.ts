import { PetsRepository } from "@/repositories/pets/pet.repository";

interface PetRegisterBody {
  name: string;
  description: string;
  age: string;
  size: string;
  energy: string;
  environment: string;
  independence: string;
  orgId: string;
}

export class PetRegisterUseCase {
  constructor(private petsRepository: PetsRepository) {}
  async execute(data: PetRegisterBody) {
    const pet = await this.petsRepository.create({
      ...data,
      org_id: data.orgId,
    });

    return { pet };
  }
}
