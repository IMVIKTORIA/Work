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
  onClickRevokeTask?: (props: InputDataCategory) => void;
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
    onClickRevokeTask,
  } = props;

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
    const fetchedInfo = await Scripts.getApprovalInfoCard(data.id);
    setInfo(fetchedInfo);
  };

  // Получить информацию согласования
  const fetchLabels = async () => {
    const fetchedLabels = await Scripts.getAdditionalInfo(data.id);
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
    const previewData = await Scripts.getEmailPreview(data.id);
    setEmailPreviewData(previewData);
  };

  // Перезагрузить данные формы
  const reloadFulldata = () => {
    setIsLoading(true);
    // Получить полные данные по data.id
    Scripts.getApprovalFulldata(data.id).then((fullData) => {
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
            approvalId={data.id}
            handleSaveClick={handleSaveClick}
            handleCancelClick={handleCancelClick}
          />
        </ModalWrapper>
      )}
      {isShowPaperModal && (
        <ModalWrapper>
          <PaperModal
            approvalId={data.id}
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
          {/* Шапка */}
          <CustomListRow
            data={data as any}
            columnsSettings={columnsSettings}
            // isShowDetails={false}
            setOpenRowIndex={onClickRowHandler}
            reloadData={function () {}}
            isOpen
            isClickable
          />
          {/* <ApprovalHeader {...props} /> */}
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
                name={`Застрахованные (${elementsCount})`}
              >
                {
                  /* !isContractorsLoading && */ values.isCollective && (
                    <InsuredPanel approvalId={data.id} />
                  )
                }
              </TabItem>
            </TabsWrapper>
            {/* Кнопки */}
            <ApprovalButtons
              setIsShowEmailModal={setIsShowEmailModal}
              setIsShowPaperModal={setIsShowPaperModal}
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
