import { Pet } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/not-found-error";
import { PetsRepository } from "@/repositories/pets/pet.repository";

interface GetPetProfileRequest {
  petId: string;
}

interface GetPetProfileResponse {
  pet: Pet;
}

export class GetPetProfileUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    petId,
  }: GetPetProfileRequest): Promise<GetPetProfileResponse> {
    const pet = await this.petsRepository.findById(petId);

    if (!pet) throw new ResourceNotFoundError();

    return { pet };
  }
}
