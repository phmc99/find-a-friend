import { describe, it, expect, beforeEach } from "vitest";
import { PetRegisterUseCase } from "./register";
import { InMemoryPetsRepository } from "@/repositories/pets/in-memory-orgs-repository";
import { OrgRegisterUseCase } from "../orgs/register";
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
    orgId: "",
  };

  const orgRegisterBody = {
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

  let petsRepository: InMemoryPetsRepository;
  let orgsRepository: InMemoryOrgsRepository;
  let sut: PetRegisterUseCase;
  let orgRegister: OrgRegisterUseCase;

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository();
    orgsRepository = new InMemoryOrgsRepository();
    sut = new PetRegisterUseCase(petsRepository);
    orgRegister = new OrgRegisterUseCase(orgsRepository);
  });

  it.only("should be albe to create a pet", async () => {
    const { org } = await orgRegister.execute(orgRegisterBody);

    petRegisterBody.orgId = org.id;

    const { pet } = await sut.execute(petRegisterBody);

    expect(pet.id).toEqual(expect.any(String));
  });
});
