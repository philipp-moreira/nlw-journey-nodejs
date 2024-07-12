import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { dayjs } from "../../lib/dayjs";

export async function updateTrip(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().put(
    "/trips/:tripId",
    {
      schema: {
        params: z.object({
          tripId: z.string().uuid(),
        }),
        body: z.object({
          destination: z.string().min(4),
          starts_at: z.coerce.date(),
          ends_at: z.coerce.date(),
        }),
      },
    },
    async (request) => {
      const { tripId } = request.params;
      const { destination, starts_at, ends_at } = request.body;

      const trip = await prisma.trip.findUnique({
        where: {
          id: tripId,
        },
        include: {
          activities: true,
        },
      });

      if (!trip) {
        throw new Error("Trip not found");
      }

      if (dayjs(starts_at).isBefore(new Date())) {
        throw new Error(
          "The start date of the trip must be equal to or greater than today."
        );
      }

      if (dayjs(ends_at).isBefore(starts_at)) {
        throw new Error(
          "The end date of the trip must be greater than starts date."
        );
      }

      const activitiesOutsideTheNewTripPeriod = trip.activities.filter(
        (activity) =>
          dayjs(activity.occurs_at).isBefore(starts_at) ||
          dayjs(activity.occurs_at).isAfter(ends_at)
      );
      
      console.log(
        "\t",
        "activitiesOutsideTheNewTripPeriod",
        activitiesOutsideTheNewTripPeriod
      );

      if (activitiesOutsideTheNewTripPeriod.length > 0) {
        return {
          error: "There are activities outside the New Travel Period.",
          activities: activitiesOutsideTheNewTripPeriod,
        };
      }

      await prisma.trip.update({
        where: { id: tripId },
        data: { destination, starts_at, ends_at },
      });

      return { tripId: trip.id };
    }
  );
}
