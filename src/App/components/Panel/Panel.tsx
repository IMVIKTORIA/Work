import React, { useState } from 'react'
import Context from '../../stores/context'

function Panel({ children, label = '', isRollable = true, isOpen = true }) {
	const [isPanelOpen, setIsPanelOpen] = useState<boolean>(isOpen)

	const handleClick = () => {
		if (!isRollable) return
		setIsPanelOpen(!isPanelOpen)
	}

	let triangleElement: any = null
	if (isRollable) {
		triangleElement = (
			<span
				className={
					isPanelOpen
						? 'medpult-panel__triangle medpult-panel__triangle_open'
						: 'medpult-panel__triangle'
				}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="#2f91e3"
					height="20px"
					width="20px"
					version="1.1"
					id="Capa_1"
					viewBox="0 0 490 490"
					xml:space="preserve"
				>
					<polygon points="245,456.701 490,33.299 0,33.299 " />
				</svg>
			</span>
		)
	}

	return (
		<div className="medpult-panel">
			<div className={isPanelOpen ? 'medpult-panel__content' : 'medpult-panel__content_hidden'}>
				{children}
			</div>
		</div>
	)
}

export default Panel
