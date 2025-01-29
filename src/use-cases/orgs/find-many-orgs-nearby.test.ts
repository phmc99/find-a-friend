import { InMemoryOrgsRepository } from "@/repositories/orgs/in-memory-orgs-repository";
import { describe, beforeEach, it, expect } from "vitest";
import { FetchNearbyOrgsUseCase } from "./find-many-orgs-nearby";

describe("Fetch Nearby Orgs Use Case", () => {
  const orgNext = {
    name: "Next",
    author: "Admin",
    email: "johndoe1@example.com",
    whatsapp: "1234567890",
    password: "password123",
    cep: "12345-678",
    state: "RJ",
    city: "Rio de Janeiro",
    neighborhood: "Centro",
    street: "Rua Principal",
    number: "123",
    complement: "Apt 101",
    lat: -22.873580000695675,
    lon: -43.263853814479916,
  };

  const orgFar = {
    name: "Saqua",
    author: "Admin",
    email: "johndoe1@example.com",
    whatsapp: "1234567890",
    password: "password123",
    cep: "12345-678",
    state: "RJs",
    city: "Saquarema",
    neighborhood: "Centro",
    street: "Rua Principal",
    number: "123",
    complement: "Apt 101",
    lat: -22.935180285834615,
    lon: -42.483381958184964,
  };

  let orgsRepository: InMemoryOrgsRepository;
  let sut: FetchNearbyOrgsUseCase;

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository();
    sut = new FetchNearbyOrgsUseCase(orgsRepository);
  });

  it("should be able to fetch nearby orgs", async () => {
    await orgsRepository.create(orgNext);
    await orgsRepository.create(orgFar);

    const nearbyOrgs = await sut.execute({
      userLatitude: -22.873,
      userLongitude: -43.265,
    });

    expect(nearbyOrgs.orgs).toHaveLength(1);
    expect(nearbyOrgs.orgs).toEqual([
      expect.objectContaining({ name: "Next" }),
    ]);
  });
});
