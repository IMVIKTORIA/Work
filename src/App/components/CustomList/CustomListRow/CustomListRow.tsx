import React, { useEffect, useState } from 'react'
import { IInputData, ListColumnData, getDetailsLayoutAttributes } from '../../../shared/types'
import CustomListRowColumn from '../CustomListRowColumn/CustomListRowColumn'
import Loader from '../../Loader/Loader'

interface ListRowProps {
	/** Настройки строки (обязательно) */
	/** Параметры отображения колонки */
	columnsSettings: ListColumnData[]
	/** Данные строки */
	data: { [key: string]: IInputData }

	/** Настройки открытия детальной информации по строке (Необязательно) */
	/** Показать детальную информацию */
	isShowDetails?: boolean
	/** Обработчик нажатия на строку */
	setOpenRowIndex?: () => any
	/** Функция получения разметки детальной информации строки списка */
	getDetailsLayout?: ({ rowData, onClickRowHandler }: getDetailsLayoutAttributes) => any

	/** Строгие настройки отображения строки списка (Необязательно) */
	/** Открыта */
	isOpen?: boolean
	/** Кликабельна */
	isClickable?: boolean

	reloadData: () => void
}

/** Строка динамического списка */
function CustomListRow(props: ListRowProps) {
	const {
		isShowDetails,
		columnsSettings,
		data,
		getDetailsLayout,
		setOpenRowIndex,
		isOpen,
		isClickable,
		reloadData,
	} = props

	/** Получение значения класса строки */
	const getRowClassname = (): string => {
		// Показана детальная информация
		if ((getDetailsLayout && isShowDetails) || isOpen) return 'custom-list-row-approval custom-list-row-approval_open'
		// Скрыта детальная информация, можно развернуть
		if (getDetailsLayout || isClickable) return 'custom-list-row-approval custom-list-row-approval_openable'
		// Нельзя развернуть детальную информацию
		return 'custom-list-row-approval'
	}

	return (
		<>
			{!isShowDetails && (
				<div className={getRowClassname()} onClick={setOpenRowIndex}>
					{columnsSettings.map((settings) => {
						if (data == undefined) {
							console.log(data)
							return
						}
						const columnData = data[settings.code]

						return <CustomListRowColumn data={columnData} {...settings} />
					})}
				</div>
			)}
			{/* Заменять строку на разметку деталей строки списка */}
			{isShowDetails &&
				getDetailsLayout &&
				getDetailsLayout({
					rowData: data,
					reloadData: reloadData,
					onClickRowHandler: setOpenRowIndex,
				})}
		</>
	)
}

export default CustomListRow
