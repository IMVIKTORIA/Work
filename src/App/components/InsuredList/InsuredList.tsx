import React, { useEffect, useState } from "react";
import CustomList from "../../../UIKit/CustomList/CustomList";
import { ListColumnData } from "../../../UIKit/CustomList/CustomListTypes";
import { InsuredListData } from "../../shared/types";
import Scripts from "../../shared/utils/clientScripts";

export interface InsuredListProps {
  // selectedContractorsIds: string[],
  // setSelectedContractorsIds: (ids: string[]) => void
  /** id согласования */
  approvalId: string;
}

/** Список застрахованных */
export default function InsuredList({
  approvalId /* selectedContractorsIds, setSelectedContractorsIds */,
}: InsuredListProps) {
  /** Колонки списка */
  const columns = [
    new ListColumnData({
      name: "ФИО застрахованного",
      code: "fullname",
      fr: 1,
      isSortable: true,
      isLink: true,
    }),
    new ListColumnData({
      name: "Дата рождения",
      code: "birthdate",
      fr: 1,
      isSortable: true,
      isLink: false,
    }),
    new ListColumnData({
      name: "Полис",
      code: "policy",
      fr: 1,
      isSortable: true,
      isLink: false,
    }),
    new ListColumnData({
      name: "Срок действия полиса",
      code: "policyTerm",
      fr: 1,
      isSortable: true,
      isLink: false,
    }),
    new ListColumnData({
      name: "Номер согласования",
      code: "appealNumb",
      fr: 1,
      isSortable: true,
      isLink: false,
    }),
  ];

  // useEffect(() => console.log(selectedContractorsIds), [selectedContractorsIds])

  const [reloadHandler, setReloadHandler] = useState<() => void>(() => {});

  /** Установка обработчика нажатия на поиск */
  const setSearchHandler = (callback: () => void) => {
    setReloadHandler(() => callback);
  };

  return (
    <div className="insured-list">
      <div className="insured-list__list">
        <CustomList<undefined, InsuredListData>
          columnsSettings={columns}
          getDataHandler={() => Scripts.getApprovalInsuredList(approvalId)}
          // isSelectable={true}
          // isMultipleSelect={true}
          height="300px"
          listWidth={2000}
          // setSelectedItems={(ids: string[]) => setSelectedContractorsIds(ids)}
          // selectedItems={selectedContractorsIds}
          setSearchHandler={setSearchHandler}
        />
      </div>
    </div>
  );
}
