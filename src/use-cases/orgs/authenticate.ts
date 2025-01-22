import { OrgsRepository } from "@/repositories/orgs/org.repository";
import { compare } from "bcryptjs";
import { Org } from "@prisma/client";
import { InvalidCredentialsError } from "../errors/invalid-credentials-error";

interface OrgAuthBody {
  email: string;
  password: string;
}

interface OrgAuthResponse {
  org: Org;
}

export class OrgAuthUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({ email, password }: OrgAuthBody): Promise<OrgAuthResponse> {
    const org = await this.orgsRepository.findByEmail(email);

    if (!org) throw new InvalidCredentialsError();

    const doesPasswordMatches = await compare(password, org.password);

    if (!doesPasswordMatches) throw new InvalidCredentialsError();

    return { org };
  }
}
