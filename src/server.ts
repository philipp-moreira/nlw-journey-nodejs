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
import { createInvite } from "./routes/participants/create-invite";
import { getParticipants } from "./routes/participants/get-participants";
import { confirmTrip } from "./routes/trips/confirm-trip";
import { createTrip } from "./routes/trips/create-trip";
import { getTripDetails } from "./routes/trips/get-trip-details";
import { updateTrip } from "./routes/trips/update-trip";
import { getParticipant } from "./routes/participants/get-participant";
import { env } from "./env";

const app = fastify();

// Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(cors, {
  origin: "*",
});
app.register(createTrip);
app.register(updateTrip);
app.register(getTripDetails);
app.register(confirmTrip);
app.register(confirmParticipant);
app.register(getParticipant);
app.register(createActivity);
app.register(getActivities);
app.register(createLink);
app.register(getLinks);
app.register(getParticipants);
app.register(createInvite);

app.listen({ port: env.PORT }).then(() => {
  console.log(`Server is running on ${env.PORT}`);
});
