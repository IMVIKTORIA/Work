import React, {
	ButtonHTMLAttributes,
	ReactNode,
	useEffect,
	useReducer,
	useRef,
	useState,
} from 'react'
import { ListColumnData, SortData } from '../../../shared/types'
import icons from '../../../shared/icons'

interface ListColumnProps extends ListColumnData {
	handleSortClick: any
	sortData: SortData | undefined
	onColumnResize: any
}

function CustomListColumn(props: ListColumnProps) {
	const { code, fr, isSortable, name, handleSortClick, sortData, onColumnResize } = props

	const headerRef = useRef<HTMLTableCellElement>(null); // Указан тип для useRef

	useEffect(() => {
		const observer = new ResizeObserver(([entry]) => {
			if (entry && entry.contentRect) {
				onColumnResize(entry.contentRect.width);
			}
		});

		if (headerRef.current) {
			observer.observe(headerRef.current);
		}

		return () => {
			if (headerRef.current) {
				observer.unobserve(headerRef.current);
			}
		};
	}, [onColumnResize]);

	/** Переключение режима сортировки для колонки */
	const toggleSortColumn = () => {
		let data: SortData | undefined = sortData

		if (data?.code != code) {
			data = new SortData({ code: code })
		} else if (data.isAscending) {
			data = new SortData({ code: code, isAscending: false })
		} else {
			data = undefined
		}

		handleSortClick(data)
	}

	const isShowArrowUp = (): boolean => {
		return (sortData?.code == code && sortData.isAscending) || sortData?.code != code
	}

	const isShowArrowDown = (): boolean => {
		return (sortData?.code == code && !sortData.isAscending) || sortData?.code != code
	}

	const sortButton = (
		<div className="custom-list-header-column__button" onClick={toggleSortColumn}>
			<div className="custom-list-header-column__button_up">
				{isShowArrowUp() && icons.SortArrow}
			</div>
			<div className="custom-list-header-column__button_down">
				{isShowArrowDown() && icons.SortArrow}
			</div>
		</div>
	)

	return (
		<div className="custom-list-header-column" ref={headerRef} style={{ flex: fr }}>
			<div className="custom-list-header-column__name">{name}</div>
			{isSortable && sortButton}
		</div>
	)
}

export default CustomListColumn
