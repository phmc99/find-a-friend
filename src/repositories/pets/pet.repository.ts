import { Pet, Prisma } from "@prisma/client";

export interface findAllPetsSearchQuery {
  age?: string | null;
  size?: string | null;
  energy?: string | null;
  environment?: string | null;
  independence?: string | null;

  city: string;
}

export interface PetsRepository {
  findAll(searchQuery: findAllPetsSearchQuery): Promise<Pet[]>;
  findById(petId: string): Promise<Pet | null>;
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
}
