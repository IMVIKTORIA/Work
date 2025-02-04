import React from "react";
import Scripts from "../../../../shared/utils/clientScripts";
import { ApprovalData, ApprovalRowData, InputDataCategory, ListColumnData, SortData } from "../../../../shared/types";
import InputButton from "../../../InputButton/InputButton";
import CustomText from "../../../CustomText/CustomText";
import CustomSelect from "../../../CustomSelect/CustomSelect";
import icons from "../../../../shared/icons";
import CustomListColumn from "../../../CustomList/CustomListHeaderColumn/CustomListHeaderColumn";
import CustomListRow from "../../../CustomList/CustomListRow/CustomListRow";

interface ApprovalHeaderProps {
  /** Данные строки списка согласований */
  data: ApprovalRowData,
  /** Данные согласования */
  values: ApprovalData,
  setValue: (name: string, value: any) => void,
  columnsSettings: ListColumnData[],
  onClickRowHandler: () => any,
  setSelectedForma: (forma: any) => void,
  onRowClick: () => void,
}

/** Шапка согласования */
function ApprovalHeader({ onClickRowHandler, onRowClick, columnsSettings, setValue, setSelectedForma, values, data }: ApprovalHeaderProps) {

  const onClickCancel = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (!target.closest(".custom-select") && !target.closest(".input-button")) {
      onClickRowHandler();
      onRowClick();
    }
  };

  const handleFormaChange = (name: string, value: InputDataCategory) => {
    setValue(name, value);
    setSelectedForma(value); // Сохраняем выбранное значение
  };

  return (
    
    <div
      className="custom-list-row-approval custom-list-row-approval_openable amendment-details"
      style={{
        gridTemplateColumns: columnsSettings
          .map((setting) => `minmax(0,${setting.fr}fr)`)
          .join(" "),
      }}
      onClick={onClickCancel}
    >
      <CustomListRow
        data={data as any}
        columnsSettings={columnsSettings}
        isShowDetails={
          getDetailsLayout && String(data.id) === openRowIndex
        }
        setOpenRowIndex={toggleShowDetails}
        reloadData={reloadData}
      />
    </div>
  );
  // return (
    
  //   <div
  //     className="custom-list-row-approval custom-list-row-approval_openable amendment-details"
  //     style={{
  //       gridTemplateColumns: columnsSettings
  //         .map((setting) => `minmax(0,${setting.fr}fr)`)
  //         .join(" "),
  //     }}
  //     onClick={onClickCancel}
  //   >
  //     <div>
  //       <CustomText
  //         name="numberGP"
  //         inputHandler={setValue}
  //         values={values}
  //       />
  //     </div>
  //     <div>
  //       <CustomText
  //         name="services"
  //         inputHandler={setValue}
  //         values={values}
  //       />
  //     </div>
  //     <div>
  //       <CustomText name="term" inputHandler={setValue} values={values} />
  //     </div>
  //     <div>
  //       <CustomText
  //         name="status"
  //         inputHandler={setValue}
  //         values={values}
  //       />
  //     </div>
  //     <div>
  //       {/* <CustomSelect
  //         isViewMode={false}
  //         name="forma"
  //         inputHandler={handleFormaChange}
  //         values={values}
  //         getDataHandler={Scripts.getForma}
  //       /> */}
  //       <CustomText
  //         name="forma"
  //         inputHandler={setValue}
  //         values={values}
  //       />
  //     </div>
  //     <div /* className="amendment-details__actions-column" */>
  //       <CustomText
  //         name="cancelDate"
  //         inputHandler={setValue}
  //         values={values}
  //       />
  //       {/* <div className="amendment-details__button-wrapper">
  //         <InputButton svg={icons.Fail} clickHandler={""} />
  //         </div> */}
  //     </div>
  //     <div>
  //       <CustomText
  //         name="revokeTask"
  //         inputHandler={setValue}
  //         values={values}
  //       />
  //     </div>
  //     <div>
  //       <CustomText
  //         name="revokeReason"
  //         inputHandler={setValue}
  //         values={values}
  //       />
  //     </div>
  //   </div>
  // );
}

export default ApprovalHeader;
