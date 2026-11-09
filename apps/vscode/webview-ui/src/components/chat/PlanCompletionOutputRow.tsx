import { PlanActMode, TogglePlanActModeRequest } from "@shared/proto/cline/state"
import { memo, useState } from "react"
import { CopyButton } from "@/components/common/CopyButton"
import SuccessButton from "@/components/common/SuccessButton"
import MarkdownBlock from "@/components/common/MarkdownBlock"
import { StateServiceClient } from "@/services/grpc-client"

interface PlanCompletionOutputProps {
	text: string
	/** Show Implement on the latest finished plan, while the chat is still in plan mode. */
	showImplement?: boolean
}

/**
 * Quiet visual cue that the agent's plan-mode turn ended on this response:
 * a container tinted with the yellow plan accent (matching the plan/act
 * toggle and the CLI's plan-mode color) with a small, muted "Plan" label
 * and a copy button. Deliberately less prominent than the legacy bold
 * "Plan Created" header, since the response might be a question rather
 * than a finished plan.
 */
const PlanCompletionOutputRow = memo(({ text, showImplement = false }: PlanCompletionOutputProps) => {
	const [implementPending, setImplementPending] = useState(false)

	return (
		<div className="rounded-sm border border-warning/20 overflow-visible bg-warning/10">
			<div className="flex items-center justify-between gap-2 pl-2 pr-1 pt-1 -mb-1.5">
				<span className="text-xs font-medium uppercase tracking-wider text-warning/70">Plan</span>
				<CopyButton ariaLabel="Copy plan response" className="text-warning/70" textToCopy={text} />
			</div>
			<div className="plan-completion-content p-2 w-full [&_hr]:opacity-20 [&_p:last-child]:mb-0">
				<div className="wrap-anywhere [&_hr]:opacity-20">
					<MarkdownBlock markdown={text} />
				</div>
			</div>
			{showImplement && (
				<div className="px-2 pb-2">
					<SuccessButton
						className="w-full"
						disabled={implementPending}
						onClick={() => {
							setImplementPending(true)
							StateServiceClient.togglePlanActModeProto(
								TogglePlanActModeRequest.create({
									mode: PlanActMode.ACT,
								}),
							)
								.catch((error) => console.error("Failed to send the plan to act mode:", error))
								.finally(() => setImplementPending(false))
						}}>
						Implement
					</SuccessButton>
				</div>
			)}
		</div>
	)
})

PlanCompletionOutputRow.displayName = "PlanCompletionOutputRow"

export default PlanCompletionOutputRow
