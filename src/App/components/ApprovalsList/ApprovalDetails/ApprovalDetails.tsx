import React, { useEffect, useState } from "react";
import {
  ApprovalData,
  DetailsProps,
  InputDataCategory,
  ListColumnData,
} from "../../../shared/types";
import Scripts from "../../../shared/utils/clientScripts";
import CustomInput from "../../CustomInput/CustomInput";
import InputButton from "../../InputButton/InputButton";
import icons from "../../../shared/icons";
import LabledField from "../../LabledField/LabledField";
import CustomSelect from "../../CustomSelect/CustomSelect";
import CustomText from "../../CustomText/CustomText";
import Loader from "../../Loader/Loader";

interface ApprovalRowData {
  id: string;
  numberGP: InputDataCategory;
  services: InputDataCategory;
  term: InputDataCategory;
  status: InputDataCategory;
  forma: InputDataCategory;
  cancelkDate: InputDataCategory;
}

class ApprovalDetailsProps implements DetailsProps {
  data: ApprovalRowData;
  values: ApprovalData;
  setValue: (name: string, value: any) => void;
  setValues: (values: ApprovalData) => void;
  columnsSettings: ListColumnData[];
  onClickRowHandler: () => any;
  reloadData: () => void;
  setSelectedForma: (forma: any) => void;
  onRowClick: () => void;
}

/** Детальная форма согласования */
function ApprovalDetails(props: ApprovalDetailsProps) {
  const {
    data,
    values,
    setValue,
    setValues,
    columnsSettings,
    onClickRowHandler,
    setSelectedForma,
    onRowClick,
  } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [labels, setLabels] = useState({});

  useEffect(() => {
    const fetchLabels = async () => {
      const fetchedLabels = await Scripts.getAdditionalInfo();
      const labelsObject = fetchedLabels.reduce((acc, item) => {
        acc[item.value] = item.info;
        return acc;
      }, {});
      setLabels(labelsObject);
    };

    fetchLabels();
  }, []);

  React.useLayoutEffect(() => {
    setIsLoading(true);
    // Получить полные данные по data.id
    Scripts.getApprovalFulldata(data.id).then((fullData) => {
      setIsLoading(false);
      // Присвоить полные данные в состояние
      setValues(fullData as any);
    });
  }, []);

  const onClickCancel = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    if (!target.closest(".custom-select") && !target.closest(".input-button")) {
      onClickRowHandler();
      onRowClick();
    }
  };

  const handleFormaChange = (name: string, value: any) => {
    setValue(name, value);
    setSelectedForma(value); // Сохраняем выбранное значение
  };

  return (
    <>
      {isLoading ? (
        <div className="custom-list-row amendment-details">
          <Loader />
        </div>
      ) : (
        <>
          <div
            className="custom-list-row amendment-details"
            style={{
              gridTemplateColumns: columnsSettings
                .map((setting) => `minmax(0,${setting.fr}fr)`)
                .join(" "),
            }}
            onClick={onClickCancel}
          >
            <div>
              <CustomText
                name="numberGP"
                inputHandler={setValue}
                values={values}
              />
            </div>
            <div>
              <CustomText
                name="services"
                inputHandler={setValue}
                values={values}
              />
            </div>
            <div>
              <CustomText name="term" inputHandler={setValue} values={values} />
            </div>
            <div>
              <CustomText
                name="status"
                inputHandler={setValue}
                values={values}
              />
            </div>
            <div>
              <CustomSelect
                isViewMode={false}
                name="forma"
                inputHandler={handleFormaChange}
                values={values}
                getDataHandler={Scripts.getForma}
              />
            </div>
            <div className="amendment-details__actions-column">
              <CustomText
                name="cancelkDate"
                inputHandler={setValue}
                values={values}
              />
              <div className="amendment-details__button-wrapper">
                <InputButton svg={icons.Fail} clickHandler={""} />
              </div>
            </div>
          </div>
          <div>{<LabledField data={labels} />}</div>
        </>
      )}
    </>
  );
}

export default ApprovalDetails;
