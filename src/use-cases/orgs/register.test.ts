import { InMemoryOrgsRepository } from "@/repositories/orgs/in-memory-orgs-repository";
import { describe, it, expect } from "vitest";
import { OrgRegisterUseCase } from "./register";
import { compare } from "bcryptjs";
import { OrgAlreadyExistsError } from "../errors/user-already-exists-error";

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

  it("should be albe to hash the password", async () => {
    const orgsRepository = new InMemoryOrgsRepository();
    const regiserUseCase = new OrgRegisterUseCase(orgsRepository);

    const { org } = await regiserUseCase.execute(orgExample);

    const isPasswordHashed = await compare("password123", org.password);

    expect(isPasswordHashed).toBe(true);
  });

  it("shouldn't be albe to create orgs with same email", async () => {
    const orgsRepository = new InMemoryOrgsRepository();
    const regiserUseCase = new OrgRegisterUseCase(orgsRepository);

    await regiserUseCase.execute(orgExample);

    expect(() => regiserUseCase.execute(orgExample)).rejects.toBeInstanceOf(
      OrgAlreadyExistsError
    );
  });

  it("should be albe to create an org", async () => {
    const orgsRepository = new InMemoryOrgsRepository();
    const regiserUseCase = new OrgRegisterUseCase(orgsRepository);

    const { org } = await regiserUseCase.execute(orgExample);

    expect(org.id).toEqual(expect.any(String));
  });
});
