import React, { useEffect, useReducer, useRef, useState } from 'react'
import CustomSelectRow from '../CustomSelectRow/CustomSelectRow';
import CustomInput from '../CustomInput/CustomInput';
import { CustomInputProps, IInputData } from '../../shared/types';
import InputButton from '../InputButton/InputButton';
import Loader from '../Loader/Loader';
import icons from '../../shared/icons';
import CustomSelectList from '../CustomSelectList/CustomSelectList';

interface CustomSelectProps extends CustomInputProps {
	getDataHandler: () => Promise<IInputData[]>,
	isViewMode?: boolean
	isInvalid?: boolean
}

function CustomSelect(props: CustomSelectProps) {
	const {
		isViewMode,
		getDataHandler,
		inputHandler,
		name,
		values,
		isInvalid,
		...customInputProps
	} = props;

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [listWidth, setListWidth] = useState<number>(100);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [listValues, setListValues] = useState<IInputData[]>([]);
	const rootRef = useRef<HTMLDivElement>(null);
	const wrapperRef = useRef<HTMLDivElement>(null);

	const clickHandler = async () => {
		if (isViewMode) return;
		if (isOpen) return;
		// Показать список
		setIsOpen(true)
		// Показать лоадер
		setIsLoading(true)

		// Показать данные
		setListValues([]);
		const values = await getDataHandler();
		console.log(values);
		setListValues(values);

		// Скрыть лоадер
		setIsLoading(false)
	}

	const handleOptionClick = ({ value, code }: { value: string, code: string }) => {
		setIsOpen(false)
		if (!inputHandler) return;
		inputHandler(name, { value: value, data: { code: code } })
	}

	useEffect(() => {
		const wrapper = wrapperRef.current!;
		setListWidth(wrapper.getBoundingClientRect().width);
	}, [isOpen])

	const buttonSvg = icons.Triangle;

	return (
		<div className="custom-select" ref={rootRef}>
			<CustomInput
				values={values}
				name={name}
				clickHandler={clickHandler}
				wrapperRef={wrapperRef}
				cursor={isViewMode ? 'text' : 'pointer'}
				isOpen={isOpen}
				buttons={[<InputButton svg={buttonSvg} clickHandler={clickHandler} />]}
				isViewMode={isViewMode}
				isInvalid={isInvalid}
				{...customInputProps}
				readOnly
			/>
			{isOpen &&
				<CustomSelectList
					rootRef={rootRef}
					isOpen={isOpen}
					closeHandler={() => setIsOpen(false)}
					isLoading={isLoading}
					listWidth={listWidth}
				>
					{listValues.map(value =>
						<CustomSelectRow
							value={value.value}
							code={value.data?.code}
							clickHandler={handleOptionClick}
						/>
					)}
				</CustomSelectList>
			}
		</div>
	)
}

export default CustomSelect