import React, { ButtonHTMLAttributes, ReactNode, useEffect, useReducer, useRef, useState } from 'react'
import { InputDataCategory, InputDataString, ListColumnData, SortData, getDetailsLayoutAttributes } from '../../shared/types'
import icons from '../../shared/icons'
import CustomListColumn from './CustomListHeaderColumn/CustomListHeaderColumn'
import Loader from '../Loader/Loader'
import CustomListRow from './CustomListRow/CustomListRow'

type ListProps = {
	/** Основные настройки */
	/** Настройки отображения колонок */
	columnsSettings: ListColumnData[]
	/** Получение данных */
	getDataHandler: any
	/** Есть прокрутка? */
	isScrollable?: boolean

	/** Настройки поиска */
	/** Данные поиска */
	searchData?: any
	/** Установка обработчика нажатия на поиск */
	setSearchHandler?: any

	/** Получение формы детальной информации по вкладке */
	getDetailsLayout?: ({ rowData, onClickRowHandler }: getDetailsLayoutAttributes) => any
	/** Получение формы создания */
	getCreateLayout?: ({ reloadData, onClickRowHandler }: getDetailsLayoutAttributes) => any

	/** Режим создания */
	isCreateMode?: boolean;
	/** toggle Режим создания */
	closeCreateMode?: () => any;
	/** Открытая строка по-умолчанию */
	defaultOpenRowId?: any
}

function CustomList(props: ListProps) {
	const { columnsSettings, getDataHandler, searchData, setSearchHandler, isScrollable = true, getDetailsLayout, getCreateLayout, isCreateMode, closeCreateMode, defaultOpenRowId } = props;

	const [page, setPage] = useState<number>(0);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [hasMore, setHasMore] = useState<boolean>(true);
	const [sortData, setSortData] = useState<SortData>();
	const [items, setItems] = useState<any[]>([]);
	const [openRowIndex, setOpenRowIndex] = useState<string>();
	const bodyRef = useRef<HTMLDivElement>(null);

	const reloadData = () => {
		setIsLoading(false);
		setItems([])

		loadData();
	}

	const loadData = async (items: any[] = [], page: number = 0, hasMore: boolean = true) => {
		if (isLoading) return;
		if (!hasMore) return;

		setIsLoading(true);

		const fetchData = await getDataHandler(page, sortData, searchData);
		setHasMore(fetchData.hasMore)

		setItems([...items, ...fetchData.data])
		setPage(page + 1);
		setIsLoading(false);
	}

	const onScroll = () => {
		const body = bodyRef.current!;
		const height = body.scrollHeight - body.offsetHeight;
		const scrollPosition = body.scrollTop;

		if ((height - scrollPosition) / height < 0.05 && !isLoading) {
			loadData(items, page, hasMore)
		}
	}

	React.useLayoutEffect(() => {
		if (defaultOpenRowId != undefined) setOpenRowIndex(defaultOpenRowId);
		console.log("defaultOpenRowId: ", defaultOpenRowId)
	}, [])

	useEffect(() => {
		console.log("openRowIndex: ", openRowIndex)
	}, [openRowIndex])

	/** Установить обработчик нажатия на кнопку поиск */
	useEffect(() => {
		if (!setSearchHandler) return;

		setSearchHandler(() => () => { reloadData() });
	}, [searchData])

	/** Обновление оглавления при изменении сортировки */
	useEffect(() => {
		reloadData();
	}, [sortData])

	/** Обновление оглавления при изменении сортировки */
	useEffect(() => {
		if (isCreateMode) setOpenRowIndex(undefined)
	}, [isCreateMode])

	/** Нажатие на сортировку */
	const handleSortClick = (sortDataNew: SortData | undefined) => {
		setSortData(sortDataNew);
	}

	return (
		<div className='custom-list'>
			{/* Заголовок */}
			<div className={`custom-list__header${isScrollable ? ' custom-list__header_scrollable' : ''}`}>
				{columnsSettings.map(columnSettings =>
					<CustomListColumn
						sortData={sortData}
						handleSortClick={handleSortClick}
						{...columnSettings}
					/>
				)}
			</div>
			{/* Тело */}
			<div className={`custom-list__body${isScrollable ? ' custom-list__body_scrollable' : ''}`} ref={bodyRef} onScroll={onScroll}>
				{/* Форма создания */}
				{isCreateMode && getCreateLayout && getCreateLayout({ reloadData: reloadData, onClickRowHandler: () => { } })}
				{/* Данные */}
				{items.map(data => {
					/** Обработчик нажатия на строку */
					const toggleShowDetails = () => {
						if (data.id === undefined) return;
						closeCreateMode && closeCreateMode();

						if (String(data.id) == openRowIndex) {
							setOpenRowIndex(undefined)
							return
						}

						setOpenRowIndex(String(data.id))
					}

					return <CustomListRow
						key={data.id}
						data={data}
						columnsSettings={columnsSettings}
						getDetailsLayout={getDetailsLayout}
						isShowDetails={getDetailsLayout && String(data.id) === openRowIndex}
						setOpenRowIndex={toggleShowDetails}
						reloadData={reloadData}
					/>
				})}
				{isLoading && <Loader />}
			</div>
		</div>
	)
}

export default CustomList
