import fastify from "fastify";
import { appRoutes } from "./http/routes";
import { ZodError } from "zod";
import { env } from "./env";

export const app = fastify();

app.register(appRoutes);

app.setErrorHandler((error, req, rep) => {
  if (error instanceof ZodError) {
    return rep
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });
  }

  if (env.NODE_ENV !== "prod") {
    console.error(error);
  } else {
    // Datadog, NewRelic, Sentry
  }

  return rep.status(500).send({ message: "Internal server error." });
});
