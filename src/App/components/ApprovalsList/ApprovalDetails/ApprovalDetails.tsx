import React, { useEffect, useState } from "react";
import {
  ApprovalData,
  ApprovalFormType,
  ButtonType,
  DetailsProps,
  EmailPreviewData,
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
import Button from "../../Button/Button";
import Panel from "../../Panel/Panel";
import ModalWrapper from "../../InsuranceLetterModal/ModalWrapper/ModalWrapper";
import EmailModal from "../../InsuranceLetterModal/EmailModal/EmailModal";
import { copy } from "../../../shared/utils/utils";

interface ApprovalRowData {
  id: string;
  numberGP: InputDataCategory;
  services: InputDataCategory;
  term: InputDataCategory;
  status: InputDataCategory;
  forma: InputDataCategory;
  cancelDate: InputDataCategory;
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
  const [isShowEmailModal, setIsShowEmailModal] = useState<boolean>(false);

  const [labels, setLabels] = useState({});
  const [emailPreviewData, setEmailPreviewData] = useState<EmailPreviewData>();

  const fetchLabels = async () => {
    const fetchedLabels = await Scripts.getAdditionalInfo(data.id);
    const labelsObject = fetchedLabels.reduce((acc, item) => {
      acc[item.value] = item.info;
      return acc;
    }, {});
    setLabels(labelsObject);
  };

  const fetchEmailPreview = async () => {
    const previewData = await Scripts.getEmailPreview(data.id);
    setEmailPreviewData(previewData);
  };

  const reloadFulldata = () => {
    setIsLoading(true);
    // Получить полные данные по data.id
    Scripts.getApprovalFulldata(data.id).then((fullData) => {
      setIsLoading(false);
      // Присвоить полные данные в состояние
      setValues(fullData);
      setSelectedForma(fullData.forma)
    });

    fetchLabels();
    fetchEmailPreview();
  }

  useEffect(() => {
    reloadFulldata()
  }, []);

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

  /** Продолжить согласование */
  const onClickContinue = async () => {
    await Scripts.handleContinueApproval(data.id);
  }

  /** Завершить согласование */
  const onClickComplete = async () => {
    await Scripts.handleContinueApproval(data.id);
  }

  /** Сформировать ГП на бланке */
  const onClickPaper = async () => {
    await Scripts.handleContinueApproval(data.id);
  }

  /** Аннулировать согласование */
  const onClickClose = async () => {
    await Scripts.handleCloseApproval(data.id);
  }

  /** Сформировать письмо */
  const onClickEmail = async () => {
    // Появляется модальное окно для просмотра сформированного текста письма
    setIsShowEmailModal(true)
  }

  // Подтвердить и сохранить письмо
  const handleSaveEmailTextClick = (text: string) => {
    setIsShowEmailModal(false)
    reloadFulldata()
  }

  // Отмена создания письма
  const handleCancelEmailTextClick = () => {
    setIsShowEmailModal(false)
  }

  // Кнопки
  const detailsButtons = (
    <div className="approval-details__buttons" >
      {
        values.forma &&
        values.forma.data.code === ApprovalFormType.verbal && (
          <Button clickHandler={onClickComplete} title="ЗАВЕРШИТЬ СОГЛАСОВАНИЕ" />
        )
      }
      {
        values.forma &&
        values.forma.data.code === ApprovalFormType.email && (
          <Button clickHandler={onClickEmail} title="СФОРМИРОВАТЬ ПИСЬМО" />
        )
      }
      {
        values.forma &&
        values.forma.data.code === ApprovalFormType.paper && (
          <>
            <Button clickHandler={onClickPaper} title="СФОРМИРОВАТЬ ГП В БЛАНКЕ" />
          </>
        )
      }
      {/* <Button clickHandler={onClickContinue} title="ПРОДОЛЖИТЬ СОГЛАСОВАНИЕ" /> */}
      <Button
        clickHandler={onClickClose}
        buttonType="outline"
        title="АННУЛИРОВАТЬ"
      />
    </div >)

  // Шапка
  const header = (
    <div
      className="custom-list-row-approval custom-list-row-approval_openable amendment-details"
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
          name="cancelDate"
          inputHandler={setValue}
          values={values}
        />
        <div className="amendment-details__button-wrapper">
          <InputButton svg={icons.Fail} clickHandler={""} />
        </div>
      </div>
    </div>
  )

  // Скопировать текст письма
  const onClickCopy = () => {
    if (emailPreviewData?.text) copy(emailPreviewData.text)
  }
  // Проект письма
  const email = (
    <div className="approval-details_panel">
      <Panel label="Проект письма" isOpen={false}>
        <div className="approval-details_panel__content">
          <span>{emailPreviewData?.text}</span>
          <div>
            <Button title={"Скопировать"} clickHandler={onClickCopy} buttonType={ButtonType.outline}></Button></div>
        </div>
      </Panel>
    </div>
  )

  return (
    <>
      {isShowEmailModal &&
        <ModalWrapper>
          <EmailModal handleSaveClick={handleSaveEmailTextClick} handleCancelClick={handleCancelEmailTextClick} />
        </ModalWrapper>
      }
      {isLoading ? (
        <div className="custom-list-row-approval custom-list-row-approval_openable amendment-details">
          <Loader />
        </div>
      ) : (
        <div className="approval-details">
          {/* Шапка */}
          {header}
          <div className="approval-details__content">
            {/* Информация */}
            <div className="approval-details_panel">
              <Panel label="Информация" isOpen={true}>
                <LabledField data={labels} />
              </Panel>
            </div>
            {/* Проект письма */}
            {emailPreviewData && values.forma && values.forma.data.code === ApprovalFormType.email && email}
            {/* Кнопки */}
            {detailsButtons}
          </div>
        </div>
      )}
    </>
  );
}

export default ApprovalDetails;
