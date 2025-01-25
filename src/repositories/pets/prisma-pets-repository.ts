import { prisma } from "@/lib/prisma";
import { Pet, Prisma } from "@prisma/client";
import { findAllPetsSearchQuery, PetsRepository } from "./pet.repository";

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({ data });
    return pet;
  }

  async findAll(searchQuery: findAllPetsSearchQuery): Promise<Pet[]> {
    return await prisma.pet.findMany();
  }

  async findById(petId: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({ where: { id: petId } });
    return pet;
  }
}
