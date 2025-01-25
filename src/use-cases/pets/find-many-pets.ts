import { Pet } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/not-found-error";
import {
  findAllPetsSearchQuery,
  PetsRepository,
} from "@/repositories/pets/pet.repository";

interface FindManyPetsRequest extends findAllPetsSearchQuery {}

interface FindManyPetsResponse {
  pets: Pet[];
}

export class FindManyPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute(
    searchQuery: FindManyPetsRequest
  ): Promise<FindManyPetsResponse> {
    const pets = await this.petsRepository.findAll(searchQuery);

    return { pets };
  }
}
