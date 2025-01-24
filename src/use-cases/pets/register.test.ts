import { describe, it, expect, beforeEach } from "vitest";
import { PetRegisterUseCase } from "./register";
import { InMemoryPetsRepository } from "@/repositories/pets/in-memory-pets-repository";

describe("Pets Register Use Case", () => {
  const petRegisterBody = {
    name: "Buddy",
    description: "A friendly and energetic dog.",
    age: "2 years",
    size: "Medium",
    energy: "High",
    environment: "Indoor/Outdoor",
    independence: "Moderate",
    orgId: "org_id",
  };

  let petsRepository: InMemoryPetsRepository;
  let sut: PetRegisterUseCase;

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    sut = new PetRegisterUseCase(petsRepository);
  });

  it.only("should be albe to create a pet", async () => {
    const { pet } = await sut.execute(petRegisterBody);

    expect(pet.id).toEqual(expect.any(String));
  });
});
