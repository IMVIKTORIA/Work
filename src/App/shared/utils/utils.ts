import React, { useCallback, useEffect, useState } from 'react'
import { IFormData, IInputData } from '../types'
import Scripts from './clientScripts'

/** Маршрутизация по SPA */
export const redirectSPA = (href: string) => {
	let element = document.createElement('a')
	element.href = href
	element.style.display = 'none'
	document.querySelector('body')?.appendChild(element)
	element.click()
	element.remove()
}

export default {
	redirectSPA,
}

/** Значения полей формы */
export interface IMap {}

/** Создание функции изменения состояния объекта со значениями формы */
export const useMapState = <T>(
	initialValue: T | (() => T)
): [T, (name: string, value: IInputData) => void, (values: T) => void] => {
	const [state, setState] = useState<T>(initialValue)

	/** Установка значений всех полей формы */
	const setValues = React.useCallback((values: T) => {
		setState(values)
	}, [])

	/** Установка одного значения формы */
	const setValue = React.useCallback((name: string, value: any) => {
		setState((currentState) => (currentState = { ...currentState, [name]: value } as T))
	}, [])

	return [state, setValue, setValues]
}

/** Открыть карточку контрагента */
export const openContractorPage = (id?: string) => {
	id
		? localStorage.setItem('medpultContractorId', id)
		: localStorage.removeItem('medpultContractorId')

	redirectSPA(Scripts.getContractorPageLink())
}

export function useDebounce<ValueType = any>(value: ValueType, delay: number): ValueType {
	// Состояние и сеттер для отложенного значения
	const [debouncedValue, setDebouncedValue] = useState(value)

	useEffect(
		() => {
			// Выставить debouncedValue равным value (переданное значение)
			// после заданной задержки
			const handler = setTimeout(() => {
				setDebouncedValue(value)
			}, delay)

			// Вернуть функцию очистки, которая будет вызываться каждый раз, когда ...
			// ... useEffect вызван снова. useEffect будет вызван снова, только если ...
			// ... value будет изменено (смотри ниже массив зависимостей).
			// Так мы избегаем изменений debouncedValue, если значение value ...
			// ... поменялось в рамках интервала задержки.
			// Таймаут очищается и стартует снова.
			// Что бы сложить это воедино: если пользователь печатает что-то внутри ...
			// ... нашего приложения в поле поиска, мы не хотим, чтобы debouncedValue...
			// ... не менялось до тех пор, пока он не прекратит печатать дольше, чем 500ms.
			return () => {
				clearTimeout(handler)
			}
		},
		// Вызывается снова, только если значение изменится
		// мы так же можем добавить переменную "delay" в массива зависимостей ...
		// ... если вы собираетесь менять ее динамически.
		[value]
	)

	return debouncedValue
}
