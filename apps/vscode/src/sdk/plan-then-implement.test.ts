import { describe, expect, it } from "vitest"
import { userWantsPlanThenImplement } from "./plan-then-implement"

describe("userWantsPlanThenImplement", () => {
	it("matches a plan request that later says to implement", () => {
		expect(userWantsPlanThenImplement("plan asdasdasd then implement")).toBe(true)
		expect(userWantsPlanThenImplement("Please plan the export and then implement it")).toBe(true)
	})

	it("does not treat a plan-only request as approval to edit", () => {
		expect(userWantsPlanThenImplement("plan the O'Reilly export")).toBe(false)
	})

	it("does not treat 'implement the plan' as a plan-then-implement request", () => {
		expect(userWantsPlanThenImplement("implement the plan")).toBe(false)
	})
})
