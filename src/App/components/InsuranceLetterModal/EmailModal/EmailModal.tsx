import React, { useEffect, useState } from 'react';
import Scripts from '../../../shared/utils/clientScripts';
import Loader from '../../Loader/Loader';
import { ButtonType } from '../../../shared/types';
import Button from '../../Button/Button';

interface EmailModalProps {
	/** Сохранить проект */
	handleSaveClick: (text: string) => void
	/** Отмена */
	handleCancelClick: () => void
}

/** Модальное окно гарантийного письма (Email) */
export default function EmailModal({ handleSaveClick, handleCancelClick }: EmailModalProps) {
	// Флаг загрузки текста по шаблону
	const [isTextLoading, setIsTextLoading] = useState<boolean>(false);
	// Текст
	const [text, setText] = useState<string>("");

	// Генерация текста по шаблону
	useEffect(() => {
		setIsTextLoading(true);
		Scripts.generateEmailText().then(text => {
			setText(text)
			setIsTextLoading(false);
		})
	}, [])

	const onClickSave = async () => {
		handleSaveClick(text)
	}

	const onClickCancel = async () => {
		handleCancelClick()
	}

	return (
		<div className='insurance-letter-modal'>
			<div className="insurance-letter-modal__header">
				<span className="insurance-letter-modal__label">Гарантийное письмо email</span>
			</div>
			<div className='insurance-letter-modal__content' style={{ width: "500px" }}>
				{/* Текст */}
				<div className='insurance-letter-modal__text'>
					{
						isTextLoading
							? <Loader />
							: text
					}
				</div>
				{/* Кнопки */}
				<div className='insurance-letter-modal__buttons'>
					{!isTextLoading && <Button title={"Подтвердить и сохранить"} clickHandler={onClickSave} />}
					<Button title={"Отмена"} buttonType={ButtonType.outline} clickHandler={onClickCancel} />
				</div>
			</div>
		</div>
	)
}