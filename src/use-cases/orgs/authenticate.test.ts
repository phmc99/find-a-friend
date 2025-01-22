import { InMemoryOrgsRepository } from "@/repositories/orgs/in-memory-orgs-repository";
import { describe, it, expect } from "vitest";
import { hash } from "bcryptjs";
import { OrgAuthUseCase } from "./authenticate";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";

describe("Register Use Case", () => {
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

  it("should be albe to authenticate", async () => {
    const orgsRepository = new InMemoryOrgsRepository();
    const sut = new OrgAuthUseCase(orgsRepository);

    orgExample.password = await hash(orgExample.password, 6);

    await orgsRepository.create(orgExample);

    const { org } = await sut.execute({
      email: "johndoe1@example.com",
      password: "password123",
    });

    expect(org.id).toEqual(expect.any(String));
  });

  it("shouldn't be albe to authenticate with invalid e-mail", async () => {
    const orgsRepository = new InMemoryOrgsRepository();
    const sut = new OrgAuthUseCase(orgsRepository);

    orgExample.password = await hash(orgExample.password, 6);

    await orgsRepository.create(orgExample);

    await expect(
      sut.execute({
        email: "jackpaul@example.com",
        password: "password123",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("shouldn't be albe to authenticate with invalid password", async () => {
    const orgsRepository = new InMemoryOrgsRepository();
    const sut = new OrgAuthUseCase(orgsRepository);

    orgExample.password = await hash(orgExample.password, 6);

    await orgsRepository.create(orgExample);

    await expect(
      sut.execute({
        email: "johndoe1@@example.com",
        password: "999test",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
