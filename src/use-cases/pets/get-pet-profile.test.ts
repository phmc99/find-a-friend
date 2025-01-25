import { describe, it, expect, beforeEach } from "vitest";
import { ResourceNotFoundError } from "../errors/not-found-error";
import { GetPetProfileUseCase } from "./get-pet-profile";
import { InMemoryPetsRepository } from "@/repositories/pets/in-memory-pets-repository";
import { InMemoryOrgsRepository } from "@/repositories/orgs/in-memory-orgs-repository";

describe("Get Pet Profile Use Case", () => {
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
  let sut: GetPetProfileUseCase;

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository(orgsRepository);
    sut = new GetPetProfileUseCase(petsRepository);
  });

  it("should return an pet", async () => {
    const newPet = await petsRepository.create(petRegisterBody);

    const { pet } = await sut.execute({
      petId: newPet.id,
    });

    expect(pet.name).toEqual("Buddy");
  });

  it("should throw error if org is not found", async () => {
    await petsRepository.create(petRegisterBody);

    await expect(
      sut.execute({
        petId: "40028922",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
