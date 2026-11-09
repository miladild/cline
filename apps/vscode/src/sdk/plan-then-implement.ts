const PLAN_WORD = /\bplan(?:ning|ned)?\b/gi
const IMPLEMENT_WORD = /\bimplement(?:ing|ed|ation)?\b/gi

/**
 * True when the user asked for a plan and, later in the same request, asked
 * for that plan to be implemented. "implement the plan" does not count: the
 * implement request has to come after the plan request.
 */
export function userWantsPlanThenImplement(text: string): boolean {
	const visible = text.replace(/<[^>]+>/g, " ")
	const planAt = firstMatchIndex(visible, PLAN_WORD)
	const implementAt = firstMatchIndex(visible, IMPLEMENT_WORD)
	return planAt >= 0 && implementAt > planAt
}

function firstMatchIndex(text: string, pattern: RegExp): number {
	pattern.lastIndex = 0
	const match = pattern.exec(text)
	return match?.index ?? -1
}
