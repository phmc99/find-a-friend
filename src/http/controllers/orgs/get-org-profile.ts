import { makeGetOrgProfileUseCase } from "@/use-cases/factories/orgs/make-get-org-profile-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getOrgProfile(req: FastifyRequest, rep: FastifyReply) {
  const paramSchema = z.object({
    orgId: z.string(),
  });

  const getOrgProfileParams = paramSchema.parse(req.params);

  try {
    const getOrgProfileUseCase = makeGetOrgProfileUseCase();

    const org = await getOrgProfileUseCase.execute(getOrgProfileParams);

    return rep.status(200).send(org);
  } catch (error) {
    throw error;
  }
}
