import React, { useEffect, useState } from "react";
import {
  ApprovalData,
  ApprovalFormType,
  ApprovalRowData,
  DetailsProps,
  EmailPreviewData,
  ListColumnData,
  AdditionalInfo,
  InputDataCategory,
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
import CustomListRow from "../../CustomList/CustomListRow/CustomListRow";
import TabItem from "../../../../UIKit/Tabs/TabItem/TabItem";
import TabsWrapper from "../../../../UIKit/Tabs/TabsWrapper/TabsWrapper";
import { ApprovalInfoCard } from "../../../shared/types";

class ApprovalDetailsProps{
  /** Идентификатор согласования */
  approvalId: string;
  values: ApprovalData;
  setValues: (values: ApprovalData) => void;
  reloadData: () => void;
  setSelectedForma: (forma: any) => void;
  onClickRevokeTask?: (props: InputDataCategory) => void;
}

/** Детальная форма согласования */
function ApprovalDetails(props: ApprovalDetailsProps) {
  const {
    approvalId,
    values,
    setValues,
    setSelectedForma,
    onClickRevokeTask,
  } = props;

  // Данные строки TODO: Рефакторить
  const [data, setData] = useState<ApprovalRowData>();
  
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
  // Код активной вкладки
  const [activeTabCode, setActiveTabCode] = useState<string>("letter");
  // Данные
  const [info, setInfo] = useState<ApprovalInfoCard[]>([]);

  //количество застрахованных
  const [elementsCount, setElementsCount] = useState<number>(0);
  const fetchElementsCount = async () => {
    const count = await Scripts.getInsuredCount();
    setElementsCount(count);
  };
  // Вычислить количество застрахованных
  useEffect(() => {
    fetchElementsCount();
  }, []);

  // Получить информацию согласования
  const fetchInfo = async () => {
    const fetchedInfo = await Scripts.getApprovalInfoCard(approvalId);
    setInfo(fetchedInfo);
  };

  // Получить информацию согласования
  const fetchLabels = async () => {
    const fetchedLabels = await Scripts.getAdditionalInfo(approvalId);
    const labelsObject = fetchedLabels.reduce(
      (acc, item) => {
        acc[item.value] = item;
        return acc;
      },
      {} as { [key: string]: AdditionalInfo }
    );
    setLabels(labelsObject);
  };

  // Получить данные макета письма
  const fetchEmailPreview = async () => {
    const previewData = await Scripts.getEmailPreview(approvalId);
    setEmailPreviewData(previewData);
  };

  // Перезагрузить данные формы
  const reloadFulldata = () => {
    setIsLoading(true);
    // Получить полные данные по approvalId
    Scripts.getApprovalFulldata(approvalId).then((fullData) => {
      setIsLoading(false);
      // Присвоить полные данные в состояние
      setValues(fullData);
      setSelectedForma(fullData.forma);
    });

    fetchLabels();
    fetchInfo();
    fetchEmailPreview();
  };

  // Изначальная загрузка данных
  React.useLayoutEffect(() => {
    reloadFulldata();
  }, []);

  // Подтвердить и сохранить письмо
  const handleSaveClick = (text: string) => {
    setIsShowEmailModal(false);
    setIsShowPaperModal(false);
    reloadFulldata();
  };

  // Отмена создания письма
  const handleCancelClick = () => {
    setIsShowEmailModal(false);
    setIsShowPaperModal(false);
  };

  //Переход на задачу на отзыв
  const handleClick = (info: string) => {};

  useEffect(() => {
    if (
      values.forma &&
      (values.forma.data.code === ApprovalFormType.email ||
        values.forma.data.code === ApprovalFormType.paper)
    ) {
      setActiveTabCode("letter");
    } else if (
      values.forma &&
      values.forma.data.code === ApprovalFormType.verbal
    ) {
      setActiveTabCode("info");
    }
  }, [values.forma.data.code]);

  return (
    <>
      {isShowEmailModal && (
        <ModalWrapper>
          <EmailModal
            approvalId={approvalId}
            handleSaveClick={handleSaveClick}
            handleCancelClick={handleCancelClick}
          />
        </ModalWrapper>
      )}
      {isShowPaperModal && (
        <ModalWrapper>
          <PaperModal
            approvalId={approvalId}
            handleSaveClick={handleSaveClick}
            handleCancelClick={handleCancelClick}
          />
        </ModalWrapper>
      )}
      {isLoading ? (
        <div className="custom-list-row-approval custom-list-row-approval_openable amendment-details">
          <Loader />
        </div>
      ) : (
        <div className="approval-details">
          <div className="approval-details__content">
            <TabsWrapper
              setActiveTabCodeGlobal={setActiveTabCode}
              activeTabCodeGlobal={activeTabCode}
            >
              <TabItem code={"info"} name={"Информация"}>
                <ApprovalInfo
                  labels={labels}
                  info={info}
                  onClick={onClickRevokeTask}
                />
              </TabItem>
              <TabItem code={"letter"} name={"Макет письма"}>
                {values.forma && emailPreviewData && (
                  <EmailPreview
                    emailPreviewData={emailPreviewData}
                    values={values}
                  />
                )}
              </TabItem>
              <TabItem
                code={"insured"}
                name={
                  values.isCollective
                    ? `Застрахованные (${elementsCount})`
                    : "Застрахованные"
                }
              >
                {
                  values.isCollective && (
                    <InsuredPanel approvalId={approvalId} />
                  )
                }
              </TabItem>
            </TabsWrapper>
            {/* Кнопки */}
            <ApprovalButtons
              reloadFulldata={reloadFulldata}
              {...props}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default ApprovalDetails;
