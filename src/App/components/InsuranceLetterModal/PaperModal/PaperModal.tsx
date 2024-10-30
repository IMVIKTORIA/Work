import React, { useEffect, useState } from 'react';
import { copy } from '../../../shared/utils/utils';
import Scripts from '../../../shared/utils/clientScripts';
import FileViewer from '../FileViewer/FileViewer';
import LabledField from '../../LabledField/LabledField';

/** Модальное окно гарантийного письма (В форме бланка) */
export default function PaperModal() {
	// const [isFileLoading, setIsFileLoading] = useState<boolean>(false);

	// /** Обновление файла */
	// const updateFile = () => {
	// 	setIsFileLoading(true)
	// 	Scripts.generateFile().then(fileSrc => {
	// 		const letterData = data.insuranceLetter
	// 		letterData.fileSrc = fileSrc;
	// 		setValue("insuranceLetter", letterData);

	// 		setIsFileLoading(false)
	// 	})
	// }

	// // Генерация файла по шаблону
	// React.useLayoutEffect(() => {
	// 	setIsFileLoading(true)
	// 	Scripts.generateFile().then(fileSrc => {
	// 		const letterData = data.insuranceLetter
	// 		letterData.fileSrc = fileSrc;
	// 		setValue("insuranceLetter", letterData);

	// 		setIsFileLoading(false)
	// 	})
	// }, [])

	// const onChangeDateFrom = (date: string) => {
	// 	const letterData = data.insuranceLetter
	// 	letterData.dateFrom = date;

	// 	setValue("insuranceLetter", letterData);
	// }

	// const onChangeDateTo = (date: string) => {
	// 	const letterData = data.insuranceLetter
	// 	letterData.dateTo = date;

	// 	setValue("insuranceLetter", letterData);
	// }

	// const onClickUpdate = async () => {
	// 	setIsFileLoading(true)

	// 	const letterData = data.insuranceLetter
	// 	await Scripts.updateApprovalDates(letterData)
	// 	letterData.fileSrc = await Scripts.generateFile();
	// 	setValue("insuranceLetter", letterData);

	// 	setIsFileLoading(false)
	// }

	// const onClickCancel = async () => {
	// 	setValue("isShowPaperModal", false);
	// }

	// const onClickCreate = async () => {
	// 	await Scripts.handlePaperClick()
	// 	setValue("isShowPaperModal", false);
	// }

	return (
		<div className='insurance-letter-modal'>
			{/* <div className="insurance-letter-modal__header">
				<span className="insurance-letter-modal__label">Гарантийное письмо на бланке</span>
			</div>
			<div className='insurance-letter-modal__content' style={{ width: "600px" }}>
				<div className='insurance-letter-modal__viewer'>
					<FileViewer src={data.insuranceLetter.fileSrc} isFileLoading={isFileLoading} />
				</div>
				<div className='insurance-letter-modal__separator'></div>
			
				<LabledField label={"Срок действия согласования"} >
					<div className='insurance-letter-modal__dates'>
						<LabledField label={"Дата с"} >
							<CustomInputDate type={InputDateType.date} value={data.insuranceLetter.dateFrom} setValue={onChangeDateFrom} />
						</LabledField>
						<LabledField label={"Дата по"} >
							<CustomInputDate type={InputDateType.date} value={data.insuranceLetter.dateTo} setValue={onChangeDateTo} />
						</LabledField>
					</div>
				</LabledField>
			
				<div>
					<Button title={"Обновить"} buttonType={ButtonType.outline} clickHandler={onClickUpdate} />
				</div>
				<div className='insurance-letter-modal__separator'></div>
			
				<div className='insurance-letter-modal__buttons'>
					{!isFileLoading && <Button title={"Сформировать ГП в pdf"} clickHandler={onClickCreate} />}
					<Button title={"Отмена"} buttonType={ButtonType.outline} clickHandler={onClickCancel} />
				</div>
			</div> */}
		</div>
	)
}