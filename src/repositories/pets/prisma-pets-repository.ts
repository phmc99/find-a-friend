import { prisma } from "@/lib/prisma";
import { Pet, Prisma } from "@prisma/client";
import { findAllPetsSearchQuery, PetsRepository } from "./pet.repository";

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({ data });
    return pet;
  }

  async findAll(searchQuery: findAllPetsSearchQuery): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        age: searchQuery.age || undefined,
        size: searchQuery.size || undefined,
        energy: searchQuery.energy || undefined,
        environment: searchQuery.environment || undefined,
        independence: searchQuery.independence || undefined,
        org: {
          city: {
            contains: searchQuery.city,
            mode: "insensitive",
          },
        },
      },
    });
    return pets;
  }

  async findById(petId: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({ where: { id: petId } });
    return pet;
  }
}
