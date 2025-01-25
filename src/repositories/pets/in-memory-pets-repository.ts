import { Pet, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { findAllPetsSearchQuery, PetsRepository } from "./pet.repository";
import { InMemoryOrgsRepository } from "../orgs/in-memory-orgs-repository";

export class InMemoryPetsRepository implements PetsRepository {
  public pets: Pet[] = [];

  constructor(private orgsRepository: InMemoryOrgsRepository) {}

  async findAll(searchQuery: findAllPetsSearchQuery): Promise<Pet[]> {
    const orgsByCity = this.orgsRepository.orgs.filter(
      (org) => org.city === searchQuery.city
    );

    const filteredPets = this.pets
      .filter((pet) => orgsByCity.some((org) => org.id === pet.org_id))
      .filter((pet) => (searchQuery.age ? pet.age === searchQuery.age : true))
      .filter((pet) =>
        searchQuery.size ? pet.size === searchQuery.size : true
      )
      .filter((pet) =>
        searchQuery.energy ? pet.energy === searchQuery.energy : true
      )
      .filter((pet) =>
        searchQuery.independence
          ? pet.independence === searchQuery.independence
          : true
      )
      .filter((pet) =>
        searchQuery.environment
          ? pet.environment === searchQuery.environment
          : true
      );

    return filteredPets;
  }

  async findById(petId: string): Promise<Pet | null> {
    const pet = this.pets.find((item) => item.id === petId);

    if (!pet) return null;

    return pet;
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet: Pet = {
      id: randomUUID(),
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
      is_active: true,
    };

    this.pets.push(pet);

    return pet;
  }
}
