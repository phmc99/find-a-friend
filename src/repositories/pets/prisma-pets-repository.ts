import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { PetsRepository } from "./pet.repository";

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({ data });
    return pet;
  }
}
