import { InMemoryOrgsRepository } from "@/repositories/orgs/in-memory-orgs-repository";
import { describe, it, expect, beforeEach } from "vitest";
import { GetOrgProfileUseCase } from "./get-org-profile";
import { ResourceNotFoundError } from "../errors/not-found-error";

describe("Get Org Profile Use Case", () => {
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
  let sut: GetOrgProfileUseCase;

  beforeEach(() => {
    orgExample.password = "password123";
    orgsRepository = new InMemoryOrgsRepository();
    sut = new GetOrgProfileUseCase(orgsRepository);
  });

  it("should return an org", async () => {
    const newOrg = await orgsRepository.create(orgExample);

    const { org } = await sut.execute({
      orgId: newOrg.id,
    });

    expect(org.name).toEqual("John Doe");
  });

  it("should throw error if org is not found", async () => {
    const org = await orgsRepository.create(orgExample);

    await expect(
      sut.execute({
        orgId: "40028922",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
