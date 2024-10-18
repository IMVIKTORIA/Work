import React, { useEffect, useState } from 'react'
import Panel from '../../components/Panel/Panel'
import Button from '../../components/Button/Button'
import { IFormData, TreatyFormData } from '../../shared/types'
import Scripts from '../../shared/utils/clientScripts'
import {
	localStorageDraftKey,
	localStorageDraftKeyInsuredId,
	localStorageIdKey,
} from '../../shared/utils/constants'
import { useMapState } from '../../shared/utils/utils'
import AmendmentTab from '../AmendmentTab/AmendmentTab'

enum TabCodes {
	general = 'general',
	sides = 'sides',
	insured = 'insured',
	insurancePlans = 'insurancePlans',
	agreementsAdditional = 'agreementsAdditional',
	files = 'files',
}

type Forma = {
	value: string
}
/** Форма договора */
export default function TreatyForm() {
	const [isViewMode, setIsViewMode] = useState<boolean>(true)

	// Код активной вкладки
	const [activeTabCode, setActiveTabCode] = useState<string>()

	const [values, setValue, setValues] = useMapState<IFormData>(new TreatyFormData())

	const [selectedForma, setSelectedForma] = useState<Forma | null>(null)
	const [isButtonVisible, setIsButtonVisible] = useState(true)

	const handleRowClick = (forma) => {
		setSelectedForma(forma)
		if (forma.value) {
			setIsButtonVisible(true) // Показываем кнопку
		} else {
			setIsButtonVisible(false) // Скрываем кнопку
		}
	}

	// Получение данных договора
	React.useLayoutEffect(() => {
		// Получение данных из черновика
		const draftData = localStorage.getItem(localStorageDraftKey)
		localStorage.removeItem(localStorageDraftKey)
		if (draftData) {
			const data = JSON.parse(draftData)

			setValues(data.values)
			setIsViewMode(data.isViewMode)
			setActiveTabCode(data.activeTabCode)

			return
		}

		// Получение данных из черновика
		const insuredId = localStorage.getItem(localStorageDraftKeyInsuredId)
		if (insuredId) {
			setActiveTabCode(TabCodes.insured)
		}

		// Получение данных из Системы
		const dataPromise: Promise<IFormData> = Scripts.getTreaty()
		dataPromise.then((data) => {
			setValues(data)
		})
	}, [])

	// Debug
	useEffect(() => {
		console.log(values)
	}, [values])

	/** Сохранить состояние в localStorage */
	const saveState = () => {
		const dataValues = values
		const dataIsViewMode = isViewMode
		const dataActiveTabCode = activeTabCode

		const data = JSON.stringify({
			values: dataValues,
			isViewMode: dataIsViewMode,
			activeTabCode: dataActiveTabCode,
			selectedForma: selectedForma,
		})

		localStorage.setItem(localStorageDraftKey, data)

		localStorage.setItem(localStorageIdKey, values.treaty.data.code)
	}

	/** Закрытие задачи */
	const handleCloseTreaty = () => {
		history.back()
	}

	return (
		<>
			<div style={{ background: '#F2F4F6', padding: '10px', minHeight: '100%' }}>
				<Panel>
					<AmendmentTab
						handler={() => {}}
						values={values}
						isViewMode={isViewMode}
						saveStateHandler={saveState}
						setSelectedForma={setSelectedForma}
						onRowClick={handleRowClick}
					/>
					<div
						style={{
							padding: '0 18px 18px 18px',
							textAlign: 'right',
							display: 'flex',
							gap: '18px',
							flexDirection: 'row',
							justifyContent: 'flex-end',
						}}
					>
						{selectedForma && selectedForma.value === 'Устное' && (
							<Button clickHandler={''} title="ЗАВЕРШИТЬ СОГЛАСОВАНИЕ" />
						)}
						{selectedForma && selectedForma.value === 'Email' && (
							<Button clickHandler={''} title="СФОРМИРОВАТЬ ПИСЬМО" />
						)}
						{selectedForma && selectedForma.value === 'ГП на бланке' && (
							<>
								<Button clickHandler={''} title="СФОРМИРОВАТЬ ГП В WORD" />
								<Button clickHandler={''} title="СФОРМИРОВАТЬ ГП В PDF" />
							</>
						)}
						<Button clickHandler={handleCloseTreaty} buttonType="outline" title="АННУЛИРОВАТЬ" />
					</div>
				</Panel>
			</div>
		</>
	)
}
