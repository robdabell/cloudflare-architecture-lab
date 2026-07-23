import { describe, expect, it } from "vitest";
import { matchCars } from "@/client/lib/carMatcher";
import { matchPets } from "@/client/lib/petMatcher";

describe("local recommendation engines", () => {
  it("returns ranked pet matches", () => {
    const matches = matchPets({
      home: "compact",
      time: "moderate",
      energy: "calm",
      allergies: false,
      noise: "quiet",
      experience: "first-time",
    });
    expect(matches.length).toBeGreaterThan(0);
    expect(matches[0].score).toBeGreaterThanOrEqual(matches.at(-1)!.score);
  });
  it("returns ranked car matches", () => {
    const cars = [
      {
        id: "mx5",
        make: "Mazda",
        model: "MX-5",
        summary: "Roadster",
        priceBand: "accessible",
        bodyStyle: "convertible",
        seats: 2,
        powertrain: "petrol",
        character: "precision",
        dailyScore: 8,
        trackScore: 6,
      },
    ] as const;
    expect(
      matchCars(cars as never, {
        budget: "accessible",
        use: "weekend",
        character: "precision",
        roof: "convertible",
        seats: "two",
        powertrain: "petrol",
      })[0].id,
    ).toBe("mx5");
  });
});
