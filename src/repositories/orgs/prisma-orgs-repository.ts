import { prisma } from "@/lib/prisma";
import { Org, Prisma } from "@prisma/client";
import { FindManyNearbyParams, IOrg, OrgsRepository } from "./org.repository";

export class PrismaOrgsRepository implements OrgsRepository {
  async findById(orgId: string): Promise<IOrg | null> {
    const org = await prisma.org.findUnique({
      where: { id: orgId },
      omit: { password: true },
    });
    return org;
  }
  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({ where: { email } });
    return org;
  }

  async findManyNearby({
    latitude,
    longitude,
  }: FindManyNearbyParams): Promise<Org[]> {
    const gyms = await prisma.$queryRaw<Org[]>`
    SELECT * from orgs
    WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( lat ) ) * cos( radians( lon ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( lat ) ) ) ) <= 20
  `;

    return gyms;
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({ data });
    return org;
  }
}
