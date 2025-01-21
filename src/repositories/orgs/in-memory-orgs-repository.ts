import { Org, Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { randomUUID } from "node:crypto";
import { OrgsRepository } from "./org.repository";

export class InMemoryOrgsRepository implements OrgsRepository {
  private orgs: Org[] = [];

  async findByEmail(email: string): Promise<Org | null> {
    const org = this.orgs.find((item) => item.email === email);

    if (!org) return null;

    return org;
  }

  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    const org: Org = {
      id: randomUUID(),
      ...data,
      lat: new Decimal("0"),
      lon: new Decimal("0"),
      number: "0",
      complement: "0",
      created_at: new Date(),
      updated_at: new Date(),
      is_active: true,
    };

    this.orgs.push(org);

    return org;
  }
}
