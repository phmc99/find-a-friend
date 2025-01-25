import { describe, it, expect, beforeEach } from "vitest";
import { InMemoryPetsRepository } from "@/repositories/pets/in-memory-pets-repository";
import { InMemoryOrgsRepository } from "@/repositories/orgs/in-memory-orgs-repository";
import { FindManyPetsUseCase } from "./find-many-pets";

describe("Find many pets Use Case", () => {
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

  const orgExample = {
    name: "John Doe",
    author: "Admin",
    email: "johndoe1@example.com",
    whatsapp: "1234567890",
    password: "password123",
    cep: "12345-678",
    state: "SP",
    city: "São Paulo",
    neighborhood: "Centro",
    street: "Rua Principal",
    number: "123",
    complement: "Apt 101",
    lat: -23.55052,
    lon: -46.633308,
  };

  let orgsRepository: InMemoryOrgsRepository;
  let petsRepository: InMemoryPetsRepository;
  let sut: FindManyPetsUseCase;

  beforeEach(() => {
    petRegisterBody.org_id = "";
    orgsRepository = new InMemoryOrgsRepository();
    petsRepository = new InMemoryPetsRepository(orgsRepository);
    sut = new FindManyPetsUseCase(petsRepository);
  });

  it("should be able to search pets by city", async () => {
    const org = await orgsRepository.create(orgExample);

    petRegisterBody.org_id = org.id;

    await petsRepository.create(petRegisterBody);
    await petsRepository.create(petRegisterBody);

    const { pets } = await sut.execute({
      city: orgExample.city,
    });

    expect(pets).toHaveLength(2);
  });
});
