import React, { useEffect, useRef, useState } from 'react'
import { CustomInputProps } from '../../shared/types'

function CustomText(props: CustomInputProps) {
	const {
		values,
		name,
		isOpen = false,
		wrapperRef = useRef<HTMLDivElement>(null),
		isViewMode = false,
		placeholder = '',
		getValueHandler,
		isInvalid,
		customClassname,
	} = props

	const getValue = () => {
		// Если есть кастомная функция получения значения - выполнить ее
		if (getValueHandler) {
			return getValueHandler(props)
		}

		// Иначе стандартный путь
		return getValueByName()
	}

	const getValueByName = () => {
		const value = values[name]
		if (!value) return ''

		return value.value
	}

	return (
		<div
			className={`custom-text__wrapper ${isOpen ? 'custom-text__wrapper_open' : ''} ${
				isInvalid ? 'custom-text__wrapper_invalid' : ''
			} ${customClassname ? customClassname : ''}`}
			ref={wrapperRef}
		>
			<span className="custom-text__content">{getValue() || placeholder}</span>
		</div>
	)
}

export default CustomText
