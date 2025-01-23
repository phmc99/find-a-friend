import { prisma } from "@/lib/prisma";
import { Org, Prisma } from "@prisma/client";
import { OrgsRepository } from "./org.repository";

export class PrismaOrgsRepository implements OrgsRepository {
  async findById(orgId: string): Promise<Org | null> {
    const org = await prisma.org.findUnique({ where: { id: orgId } });
    return org;
  }
  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({ where: { email } });
    return org;
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({ data });
    return org;
  }
}
