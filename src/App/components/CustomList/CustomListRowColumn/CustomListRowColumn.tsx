import React, { ButtonHTMLAttributes, ReactNode, useEffect, useReducer, useRef, useState } from 'react'
import { IInputData, ListColumnData, SortData } from '../../../shared/types'
import icons from '../../../shared/icons'

interface ListColumnProps extends ListColumnData {
	data: IInputData
}

function CustomListRowColumn(props: ListColumnProps) {
	const { fr, data, isLink, onClick } = props;

	const onClickColumn = isLink && onClick ? () => { onClick(data) } : () => { };

	return (
		<div className={
			isLink
				? "custom-list-row-column custom-list-row-column__link"
				: "custom-list-row-column"
		} style={{ flex: fr }}>
			<span title={data.value} onClick={onClickColumn}>
				{data.value}
			</span>
		</div>
	)
}

export default CustomListRowColumn
