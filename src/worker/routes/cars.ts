import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import {
  savedCarInputSchema,
  type SavedCar,
  type SportsCar,
} from "../../shared/contracts";
import type { AppBindings, AppVariables } from "../types";

type CarRow = Omit<
  SportsCar,
  "priceBand" | "bodyStyle" | "dailyScore" | "trackScore"
> & {
  price_band: SportsCar["priceBand"];
  body_style: SportsCar["bodyStyle"];
  daily_score: number;
  track_score: number;
};
const mapCar = (r: CarRow): SportsCar => ({
  id: r.id,
  make: r.make,
  model: r.model,
  summary: r.summary,
  seats: r.seats,
  powertrain: r.powertrain,
  character: r.character,
  priceBand: r.price_band,
  bodyStyle: r.body_style,
  dailyScore: r.daily_score,
  trackScore: r.track_score,
});
export const carRoutes = new Hono<{
  Bindings: AppBindings;
  Variables: AppVariables;
}>();
carRoutes.get("/", async (c) => {
  const { results } = await c.env.DB.prepare(
    "SELECT * FROM sports_cars ORDER BY make, model",
  ).all<CarRow>();
  return c.json(results.map(mapCar));
});
carRoutes.get("/saved", async (c) => {
  const { results } = await c.env.DB.prepare(
    "SELECT car_id AS carId, saved_at AS savedAt FROM saved_cars WHERE identity_id=? ORDER BY saved_at DESC",
  )
    .bind(c.get("identity").id)
    .all<SavedCar>();
  return c.json(results);
});
carRoutes.post("/saved", zValidator("json", savedCarInputSchema), async (c) => {
  const { carId } = c.req.valid("json");
  const exists = await c.env.DB.prepare("SELECT id FROM sports_cars WHERE id=?")
    .bind(carId)
    .first();
  if (!exists) return c.json({ detail: "Sports car not found." }, 404);
  const savedAt = new Date().toISOString();
  await c.env.DB.prepare(
    "INSERT OR REPLACE INTO saved_cars(identity_id,car_id,saved_at) VALUES(?,?,?)",
  )
    .bind(c.get("identity").id, carId, savedAt)
    .run();
  return c.json({ carId, savedAt }, 201);
});
carRoutes.delete("/saved/:carId", async (c) => {
  await c.env.DB.prepare(
    "DELETE FROM saved_cars WHERE identity_id=? AND car_id=?",
  )
    .bind(c.get("identity").id, c.req.param("carId"))
    .run();
  return c.body(null, 204);
});
