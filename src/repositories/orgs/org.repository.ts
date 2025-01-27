import { Org, Prisma } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export interface IOrg {
  id: string;
  name: string;
  author: string;
  email: string;
  whatsapp: string;
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  created_at: Date;
  updated_at: Date;
  number: string | null;
  complement: string | null;
  lat: Decimal | null;
  lon: Decimal | null;
  is_active: boolean;
}

export interface OrgsRepository {
  findById(orgId: string): Promise<IOrg | null>;
  findByEmail(email: string): Promise<Org | null>;
  create(data: Prisma.OrgCreateInput): Promise<Org>;
}
