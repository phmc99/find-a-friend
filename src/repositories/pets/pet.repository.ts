import { Pet, Prisma } from "@prisma/client";

export interface findAllPetsSearchQuery {
  age?: string;
  size?: string;
  energy?: string;
  environment?: string;
  independence?: string;

  city: string;
}

export interface PetsRepository {
  findAll(searchQuery: findAllPetsSearchQuery): Promise<Pet[]>;
  findById(petId: string): Promise<Pet | null>;
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
}
