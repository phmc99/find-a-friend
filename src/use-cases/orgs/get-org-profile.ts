import { OrgsRepository } from "@/repositories/orgs/org.repository";
import { Org } from "@prisma/client";
import { ResourceNotFoundError } from "../errors/not-found-error";

interface GetOrgProfileRequest {
  orgId: string;
}

interface GetOrgProfileResponse {
  org: Org;
}

export class GetOrgProfileUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    orgId,
  }: GetOrgProfileRequest): Promise<GetOrgProfileResponse> {
    const org = await this.orgsRepository.findById(orgId);

    if (!org) throw new ResourceNotFoundError();

    return { org };
  }
}
