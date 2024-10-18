import React, { PropsWithChildren, useEffect } from 'react'
import Loader from '../Loader/Loader';

interface CustomSelectListProps {
	rootRef: React.RefObject<HTMLDivElement>,
	isOpen: boolean,
	closeHandler: () => void,
	isLoading: boolean,
	listWidth: number
}

function CustomSelectList({
	rootRef,
	isOpen,
	closeHandler,
	isLoading,
	listWidth,
	children
}: PropsWithChildren<CustomSelectListProps>) {

	/** Клик снаружи списка */
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;

			console.log(rootRef.current)
			console.log(target)

			if (target instanceof Node && !rootRef.current?.contains(target)) {
				closeHandler();
			}
		};

		window.addEventListener("click", handleClick);

		return () => {
			window.removeEventListener("click", handleClick);
		};
	}, [])

	return (
		<div
			className='custom-select-list'

			style={{
				width: listWidth + "px"
			}}
		>
			<div className="custom-select-list__content">
				{children}
				{isLoading && <Loader />}
			</div>
		</div>
	)
}

export default CustomSelectList
