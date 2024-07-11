import fastify from "fastify";
import cors from '@fastify/cors'
import { createTrip } from "./routes/trips/create-trip";
import {
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { confirmTrip } from "./routes/trips/confirm-trip";

const app = fastify();
const appPort = 3333;

// Add schema validator and serializer
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(cors, {
  origin: '*'
})
app.register(createTrip);
app.register(confirmTrip);

app.listen({ port: appPort }).then(() => {
  console.log(`Server is running on ${appPort}`);
});
