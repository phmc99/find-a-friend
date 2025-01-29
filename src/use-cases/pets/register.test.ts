import { describe, it, expect, beforeEach } from "vitest";
import { PetRegisterUseCase } from "./register";
import { InMemoryPetsRepository } from "@/repositories/pets/in-memory-pets-repository";
import { InMemoryOrgsRepository } from "@/repositories/orgs/in-memory-orgs-repository";

describe("Pets Register Use Case", () => {
  const petRegisterBody = {
    name: "Buddy",
    description: "A friendly and energetic dog.",
    age: "2 years",
    size: "Medium",
    energy: "High",
    environment: "Indoor/Outdoor",
    independence: "Moderate",
    org_id: "org_id",
  };

  let orgsRepository: InMemoryOrgsRepository;
  let petsRepository: InMemoryPetsRepository;
  let sut: PetRegisterUseCase;

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository(orgsRepository);
    sut = new PetRegisterUseCase(petsRepository);
  });

  it("should be albe to create a pet", async () => {
    const { pet } = await sut.execute(petRegisterBody);

    expect(pet.id).toEqual(expect.any(String));
  });
});
