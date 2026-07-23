import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const projects = sqliteTable("projects", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  summary: text("summary").notNull(),
  status: text("status").notNull(),
  updatedAt: text("updated_at").notNull(),
});
export const architectureNodes = sqliteTable("architecture_nodes", {
  id: text("id").primaryKey(),
  projectId: text("project_id").notNull(),
  label: text("label").notNull(),
  kind: text("kind").notNull(),
  description: text("description").notNull(),
  positionX: real("position_x").notNull(),
  positionY: real("position_y").notNull(),
});
export const sportsCars = sqliteTable("sports_cars", {
  id: text("id").primaryKey(),
  make: text("make").notNull(),
  model: text("model").notNull(),
  summary: text("summary").notNull(),
  priceBand: text("price_band").notNull(),
  bodyStyle: text("body_style").notNull(),
  seats: integer("seats").notNull(),
  powertrain: text("powertrain").notNull(),
  character: text("character").notNull(),
  dailyScore: integer("daily_score").notNull(),
  trackScore: integer("track_score").notNull(),
});
export const savedCars = sqliteTable("saved_cars", {
  identityId: text("identity_id").notNull(),
  carId: text("car_id").notNull(),
  savedAt: text("saved_at").notNull(),
});
