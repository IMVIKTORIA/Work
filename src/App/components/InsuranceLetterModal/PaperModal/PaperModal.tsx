import React, { useEffect, useState } from 'react';
import Scripts from '../../../shared/utils/clientScripts';
import FileViewer from '../FileViewer/FileViewer';
import Button from '../../Button/Button';
import { ButtonType } from '../../../shared/types';
import Loader from '../../Loader/Loader';

interface PaperModalProps {
	/** Сохранить проект */
	handleSaveClick: (text: string) => void
	/** Отмена */
	handleCancelClick: () => void
	/** Идентификатор согласования */
	approvalId: string
}

/** Модальное окно гарантийного письма (В форме бланка) */
export default function PaperModal({ handleSaveClick, handleCancelClick, approvalId }: PaperModalProps) {
	const [isEmailDataLoading, setisEmailDataLoading] = useState<boolean>(false);
	// Текст
	const [text, setText] = useState<string>("");
	// Данные файла
	const [fileSrc, setFileSrc] = useState<string>("");

	React.useLayoutEffect(() => {
		updateFile()
	}, [])

	/** Обновление файла */
	const updateFile = () => {
		setisEmailDataLoading(true)
		Promise.all([
			Scripts.generateEmailText().then(text => {
				setText(text)
			}),
			Scripts.generateEmailFile(approvalId).then(fileSrc => {
				setFileSrc(fileSrc)
			}),
		]).then(() => setisEmailDataLoading(false))
	}

	const onClickSave = async () => {
		await Scripts.savePaperApproval(approvalId, text);
		handleSaveClick(text)
	}

	const onClickCancel = async () => {
		// Удалить файл из гарантийного письма
		await Scripts.removeLetterFile(approvalId)
		handleCancelClick()
	}

	return (
		<div className='insurance-letter-modal'>
			<div className="insurance-letter-modal__header">
				<span className="insurance-letter-modal__label">Гарантийное письмо на бланке</span>
			</div>
			<div className='insurance-letter-modal__content' style={{ width: "600px" }}>

				{/* Файл */}
				<div className='insurance-letter-modal__viewer'>
					<FileViewer src={fileSrc} isFileLoading={isEmailDataLoading} />
				</div>

				<div className='insurance-letter-modal__separator'></div>
				{/* Текст */}
				<div className='insurance-letter-modal__viewer-text'>
					{
						isEmailDataLoading
							? <Loader />
							: text
					}
				</div>
				{/* Кнопки */}
				<div className='insurance-letter-modal__buttons'>
					{!isEmailDataLoading && <Button title={"Подтвердить и сохранить"} clickHandler={onClickSave} />}
					<Button title={"Отмена"} buttonType={ButtonType.outline} clickHandler={onClickCancel} />
				</div>
			</div>
		</div>
	)
}