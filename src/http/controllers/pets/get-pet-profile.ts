import { makeGetPetProfileUseCase } from "@/use-cases/factories/pets/make-get-pet-profile-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function getPetProfile(req: FastifyRequest, rep: FastifyReply) {
  const paramSchema = z.object({
    petId: z.string(),
  });

  const getPetProfileParams = paramSchema.parse(req.params);

  try {
    const getPetProfileUseCase = makeGetPetProfileUseCase();

    const pet = await getPetProfileUseCase.execute(getPetProfileParams);

    return rep.status(200).send(pet);
  } catch (error) {
    throw error;
  }
}
