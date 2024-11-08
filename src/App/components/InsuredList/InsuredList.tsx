import React, { useEffect, useState } from 'react';
import CustomList from '../../../UIKit/CustomList/CustomList';
import { ListColumnData } from '../../../UIKit/CustomList/CustomListTypes';
import { InsuredListData } from '../../shared/types';
import Scripts from '../../shared/utils/clientScripts';

interface InsuredListProps {
	selectedContractorsIds: string[],
	setSelectedContractorsIds: (ids: string[]) => void
}

/** Список застрахованных */
export default function InsuredList({ selectedContractorsIds, setSelectedContractorsIds }: InsuredListProps) {

	/** Колонки списка */
	const columns = [
		new ListColumnData({ name: "ФИО застрахованного", code: "fullname", fr: 1, isSortable: true, isLink: false }),
		new ListColumnData({ name: "Дата рождения", code: "birthdate", fr: 1, isSortable: true, isLink: false }),
		new ListColumnData({ name: "Телефон", code: "phone", fr: 1, isSortable: true, isLink: false }),
		new ListColumnData({ name: "Email", code: "email", fr: 1, isSortable: true, isLink: false }),
		new ListColumnData({ name: "Полис", code: "policy", fr: 1, isSortable: true, isLink: false }),
		new ListColumnData({ name: "Дата начала действия полиса", code: "policyStartDate", fr: 1, isSortable: true, isLink: false }),
		new ListColumnData({ name: "Дата окончания действия полиса", code: "policyEndDate", fr: 1, isSortable: true, isLink: false }),
		new ListColumnData({ name: "Срок действия полиса", code: "policyTerm", fr: 1, isSortable: true, isLink: false }),
		new ListColumnData({ name: "Регион действия полиса", code: "policyRegion", fr: 1, isSortable: true, isLink: false }),
		new ListColumnData({ name: "Продукт", code: "policyProduct", fr: 1, isSortable: true, isLink: false }),
		new ListColumnData({ name: "План страхования", code: "plan", fr: 1, isSortable: true, isLink: false }),
		new ListColumnData({ name: "", code: "moreButton", fr: 1, isSortable: false, isLink: true, onClick: (props) => { console.log(props) } }),
	]

	useEffect(() => console.log(selectedContractorsIds), [selectedContractorsIds])

	const [reloadHandler, setReloadHandler] = useState<() => void>(() => { });

	/** Установка обработчика нажатия на поиск */
	const setSearchHandler = (callback: () => void) => {
		setReloadHandler(() => callback);
	};

	return (
		<div className="insured-list">
			<div className='insured-list__list'>
				<CustomList<undefined, InsuredListData>
					columnsSettings={columns}
					getDataHandler={Scripts.getInsuredList}
					isSelectable={true}
					isMultipleSelect={true}
					height='300px'
					listWidth={2000}
					setSelectedItems={(ids: string[]) => setSelectedContractorsIds(ids)}
					selectedItems={selectedContractorsIds}
					setSearchHandler={setSearchHandler}
				/>
			</div>
		</div>
	)
}