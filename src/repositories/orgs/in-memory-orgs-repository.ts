import { Org, Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { randomUUID } from "node:crypto";
import { FindManyNearbyParams, OrgsRepository } from "./org.repository";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-by-coordinates";

export class InMemoryOrgsRepository implements OrgsRepository {
  public orgs: Org[] = [];

  async findById(orgId: string): Promise<Org | null> {
    const org = this.orgs.find((item) => item.id === orgId);

    if (!org) return null;

    return org;
  }

  async findManyNearby(params: FindManyNearbyParams) {
    return this.orgs.filter((item) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.latitude, longitude: params.longitude },
        {
          latitude: item.lat?.toNumber() || 0,
          longitude: item.lon?.toNumber() || 0,
        }
      );

      return distance < 20;
    });
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = this.orgs.find((item) => item.email === email);

    if (!org) return null;

    return org;
  }

  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    const org: Org = {
      id: randomUUID(),
      ...data,
      lat: data.lat ? new Decimal(data.lat.toString()) : new Decimal("0"),
      lon: data.lon ? new Decimal(data.lon.toString()) : new Decimal("0"),
      number: data.number || "0",
      complement: data.complement || "0",
      created_at: new Date(),
      updated_at: new Date(),
      is_active: true,
    };

    this.orgs.push(org);

    return org;
  }
}
