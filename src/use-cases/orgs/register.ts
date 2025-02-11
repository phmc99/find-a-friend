import { OrgAlreadyExistsError } from "@/use-cases/errors/user-already-exists-error";
import { OrgsRepository } from "@/repositories/orgs/org.repository";
import { hash } from "bcryptjs";

interface OrgRegisterBody {
  name: string;
  author: string;
  email: string;
  whatsapp: string;
  password: string;
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
  complement: string;
  lat: number;
  lon: number;
}

export class OrgRegisterUseCase {
  constructor(private orgsRepository: OrgsRepository) {}
  async execute(data: OrgRegisterBody) {
    const passwordHash = await hash(data.password, 6);
    data.password = passwordHash;

    const isUsedEmail = await this.orgsRepository.findByEmail(data.email);

    if (isUsedEmail) throw new OrgAlreadyExistsError();

    const org = await this.orgsRepository.create(data);

    return { org };
  }
}
