import { Pet, Prisma } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { PetsRepository } from "./pet.repository";

export class InMemoryPetsRepository implements PetsRepository {
  public pets: Pet[] = [];

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
