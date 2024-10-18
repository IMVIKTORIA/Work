import React, { ComponentProps, useEffect, useReducer, useRef, useState } from 'react'
import { CustomInputProps, IFormData, IInputData } from '../../shared/types';

function CustomInput(props: CustomInputProps) {
	const {
		values,
		name,
		buttons,
		cursor = "text",
		inputHandler,
		clickHandler,
		isOpen = false,
		wrapperRef = useRef<HTMLDivElement>(null),
		readOnly = false,
		isViewMode = false,
		placeholder = "",
		maskFunction,
		getValueHandler,
		isInvalid,
		customClassname,
		...inputStyles
	} = props;

	const [isValid, setIsValid] = useState<boolean>(false);
	/** Поулчение значения поля */
	const getValue = () => {
		// Если есть кастомная функция получения значения - выполнить ее
		if (getValueHandler) {
			return getValueHandler(props)
		}

		// Иначе стандартный путь
		return getValueByName();
	}

	/** Поулчение значения поля по имени */
	const getValueByName = () => {
		const value = values[name];
		if (!value) return "";

		return value.value
	}

	/** Обработчик ввода в поле */
	const onInput = (ev) => {
		if (!inputHandler) return;

		let value = ev.target.value;
		// Обработка текста по маске
		if (maskFunction) value = maskFunction(ev.target.value)

		// Запись значения в состояние
		inputHandler(name, { value: value })
	}

	// Кнопки поля ввода
	const [buttonsWrapper, setButtonsWrapper] = useState<React.JSX.Element>();
	useEffect(() => {
		// Если режим редактирования и указаны кнопки, то отрисовать кнопки
		if (!isViewMode && buttons) {
			setButtonsWrapper(
				<div className='custom-input__buttons'>
					{buttons}
				</div>
			)
		} else {
			setButtonsWrapper(undefined)
		}
	}, [buttons])

	return (
		<div
			className={`custom-input__wrapper ${isOpen ? "custom-input__wrapper_open" : ""} ${isInvalid ? "custom-input__wrapper_invalid" : ""} ${customClassname ? customClassname : ""}`}

			ref={wrapperRef}
		>
			<input
				name={name}
				autoComplete="off"
				className='custom-input__input'
				style={{
					cursor: cursor
				}}
				onInput={onInput}
				onClick={clickHandler}
				value={getValue()}
				readOnly={readOnly || isViewMode}
				placeholder={placeholder}
				{...inputStyles}
			/>
			{buttonsWrapper}
		</div>
	)
}

export default CustomInput
