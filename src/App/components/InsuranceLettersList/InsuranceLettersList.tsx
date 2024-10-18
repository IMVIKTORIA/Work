import React, { useEffect, useState } from 'react'

import {
	InsuranceLetterDetailsData,
	ListColumnData,
	TabProps,
	getDetailsLayoutAttributes,
} from '../../shared/types'
import CustomList from '../CustomList/CustomList'
import Scripts from '../../shared/utils/clientScripts'
import { useMapState } from '../../shared/utils/utils'
import InsuranceLetterDetails from './InsuranceLetterDetails/InsuranceLetterDetails'

/** Список гарантийных писем */
function InsuranceLettersList({
	handler,
	isViewMode,
	saveStateHandler,
	setSelectedForma,
	onRowClick,
}) {
	/** Колонки списка */
	const columns = [
		new ListColumnData({ name: 'Номер ГП', code: 'numberGP', fr: 1, isSortable: true }),
		new ListColumnData({
			name: 'Согласованные услуги',
			code: 'services',
			fr: 1.5,
			isSortable: true,
		}),
		new ListColumnData({
			name: 'Срок действия',
			code: 'conclusionDate',
			fr: 1.5,
			isSortable: true,
		}),
		new ListColumnData({ name: 'Статус', code: 'status', fr: 1, isSortable: true }),
		new ListColumnData({ name: 'Форма', code: 'forma', fr: 1.5, isSortable: true }),
		new ListColumnData({ name: 'Дата отзыва', code: 'startDate', fr: 1, isSortable: true }),
	]

	// Данные формы деталей ДС
	const [amendmentValues, setAmendmentValue, setAmendmentValues] =
		useMapState<InsuranceLetterDetailsData>(new InsuranceLetterDetailsData())

	/** Получение формы детальной информации по строке списка ДС */
	const getAmendmentDetailsLayout = ({
		rowData,
		reloadData,
		onClickRowHandler,
	}: getDetailsLayoutAttributes) => {
		return (
			<InsuranceLetterDetails
				reloadData={reloadData}
				columnsSettings={columns}
				data={rowData}
				values={amendmentValues}
				setValue={setAmendmentValue}
				setValues={setAmendmentValues}
				onClickRowHandler={onClickRowHandler}
				setSelectedForma={setSelectedForma}
				onRowClick={onRowClick}
			/>
		)
	}

	return (
		<div className="amendment-tab">
			<CustomList
				getDetailsLayout={getAmendmentDetailsLayout}
				columnsSettings={columns}
				getDataHandler={Scripts.getAmendments}
				isScrollable={false}
			/>
		</div>
	)
}

export default InsuranceLettersList
