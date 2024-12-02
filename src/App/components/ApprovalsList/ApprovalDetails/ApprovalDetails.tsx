import React, { useEffect, useState } from "react";
import {
  ApprovalData,
  ApprovalFormType,
  ApprovalRowData, DetailsProps,
  EmailPreviewData, ListColumnData
} from "../../../shared/types";
import Scripts from "../../../shared/utils/clientScripts";
import Loader from "../../Loader/Loader";
import ModalWrapper from "../../InsuranceLetterModal/ModalWrapper/ModalWrapper";
import EmailModal from "../../InsuranceLetterModal/EmailModal/EmailModal";
import PaperModal from "../../InsuranceLetterModal/PaperModal/PaperModal";
import EmailPreview from "./EmailPreview/EmailPreview";
import ApprovalButtons from "./ApprovalButtons/ApprovalButtons";
import ApprovalHeader from "./ApprovalHeader/ApprovalHeader";
import ApprovalInfo from "./ApprovalInfo/ApprovalInfo";
import InsuredList from "../../InsuredList/InsuredList";
import InsuredPanel from "./InsuredPanel/InsuredPanel";

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
  const { data, values, setValue, setValues, columnsSettings, onClickRowHandler, setSelectedForma, onRowClick } = props

  // Флаг загрузки
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // Флаг видимости модального окна email
  const [isShowEmailModal, setIsShowEmailModal] = useState<boolean>(false);
  // Флаг видимости модального окна ГП на бланке
  const [isShowPaperModal, setIsShowPaperModal] = useState<boolean>(false);

  // Данные
  const [labels, setLabels] = useState({});
  // Данные макета письма
  const [emailPreviewData, setEmailPreviewData] = useState<EmailPreviewData>();

  /** Идентификаторы выбранных контрагентов */
  const [selectedContractorsIds, setSelectedContractorsIds] = useState<string[]>([]);
  const [isContractorsLoading, setIsContractorsLoading] = useState<boolean>(true);

  // Получить информацию согласования
  const fetchLabels = async () => {
    const fetchedLabels = await Scripts.getAdditionalInfo(data.id);
    const labelsObject = fetchedLabels.reduce((acc, item) => {
      acc[item.value] = item.info;
      return acc;
    }, {});
    setLabels(labelsObject);
  };

  // Получить данные макета письма
  const fetchEmailPreview = async () => {
    const previewData = await Scripts.getEmailPreview(data.id);
    setEmailPreviewData(previewData);
  };

  // Получить список застрахованых
  const fetchInsuredList = async () => {
    setIsContractorsLoading(true)

    const contractorsIds = await Scripts.getApprovalInsuredList(data.id);
    setSelectedContractorsIds(contractorsIds);

    setIsContractorsLoading(false)
  };

  // Перезагрузить данные формы
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
    fetchInsuredList();
  }

  // Изначальная загрузка данных
  React.useLayoutEffect(() => {
    reloadFulldata()
  }, []);

  // Подтвердить и сохранить письмо
  const handleSaveClick = (text: string) => {
    setIsShowEmailModal(false)
    setIsShowPaperModal(false)
    reloadFulldata()
  }

  // Отмена создания письма
  const handleCancelClick = () => {
    setIsShowEmailModal(false)
    setIsShowPaperModal(false)
  }

  return (
    <>
      {isShowEmailModal &&
        <ModalWrapper>
          <EmailModal approvalId={data.id} handleSaveClick={handleSaveClick} handleCancelClick={handleCancelClick} />
        </ModalWrapper>
      }
      {isShowPaperModal &&
        <ModalWrapper>
          <PaperModal approvalId={data.id} handleSaveClick={handleSaveClick} handleCancelClick={handleCancelClick} />
        </ModalWrapper>
      }
      {isLoading ? (
        <div className="custom-list-row-approval custom-list-row-approval_openable amendment-details">
          <Loader />
        </div>
      ) : (
        <div className="approval-details">
          {/* Шапка */}
          <ApprovalHeader {...props} />
          <div className="approval-details__content">
            {/* Информация */}
            <ApprovalInfo labels={labels} />
            {/* Проект письма */}
            {values.forma && (values.forma.data.code === ApprovalFormType.email || values.forma.data.code === ApprovalFormType.paper) && emailPreviewData && <EmailPreview emailPreviewData={emailPreviewData} />}
            {/* Проект письма */}
            {!isContractorsLoading && values.isCollective && <InsuredPanel selectedContractorsIds={selectedContractorsIds} setSelectedContractorsIds={setSelectedContractorsIds} />}
            {/* Кнопки */}
            <ApprovalButtons setIsShowEmailModal={setIsShowEmailModal} setIsShowPaperModal={setIsShowPaperModal} reloadFulldata={reloadFulldata} {...props} />
          </div>
        </div>
      )}
    </>
  );
}

export default ApprovalDetails;
