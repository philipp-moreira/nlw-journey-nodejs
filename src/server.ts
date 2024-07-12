import cors from "@fastify/cors";
import fastify from "fastify";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { createActivity } from "./routes/activities/create-activity";
import { getActivities } from "./routes/activities/get-activities";
import { createLink } from "./routes/links/create-link";
import { getLinks } from "./routes/links/get-links";
import { confirmParticipant } from "./routes/participants/confirm-participant";
import { confirmTrip } from "./routes/trips/confirm-trip";
import { createTrip } from "./routes/trips/create-trip";

const app = fastify();
const appPort = 3333;

// Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(cors, {
  origin: "*",
});
app.register(createTrip);
app.register(confirmTrip);
app.register(confirmParticipant);
app.register(createActivity);
app.register(getActivities);
app.register(createLink);
app.register(getLinks);

app.listen({ port: appPort }).then(() => {
  console.log(`Server is running on ${appPort}`);
});
