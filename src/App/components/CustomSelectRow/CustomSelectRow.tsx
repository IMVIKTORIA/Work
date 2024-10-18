import React, { useEffect, useState } from 'react'

function CustomSelectRow({ value, code, data, clickHandler }: { value: string; code?: string, data?: any, clickHandler: any }) {
	const onClickRow = (ev) => {
		ev.stopPropagation();
		clickHandler({ value, code, data })
	}
	return (
		<div className="custom-select__row" onClick={onClickRow}>
			{value}
		</div>
	)
}

export default CustomSelectRow
