import React from "react";
import Button from "../../../Button/Button";
import Scripts from "../../../../shared/utils/clientScripts";
import { ApprovalData, ApprovalFormType, ApprovalRowData, ApprovalStatus } from "../../../../shared/types";
interface ApprovalButtonsProps {
  /** Установить видимость модалки email */
  setIsShowEmailModal: React.Dispatch<React.SetStateAction<boolean>>,
  /** Установить видимость модалки ГП на бланке */
  setIsShowPaperModal: React.Dispatch<React.SetStateAction<boolean>>,
  /** Данные строки списка согласований */
  data: ApprovalRowData,
  /** Данные согласования */
  values: ApprovalData
}

/** Проект письма */
function ApprovalButtons({ setIsShowEmailModal, setIsShowPaperModal, data, values }: ApprovalButtonsProps) {

  /** Завершить согласование */
  const onClickComplete = async () => {
    // Изменить статус
    // await Scripts.handleContinueApproval(data.id);
  }

  /** Сформировать ГП на бланке */
  const onClickPaper = async () => {
    // Появляется модальное окно для просмотра сформированного текста письма и файла
    setIsShowPaperModal(true)
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

  /** Отправить письмо */
  const onClickSendEmail = async () => {
    // Появляется модальное окно для отправки email
  }

  return (
    <div className="approval-details__buttons" >
      {
        values.forma &&
        values.forma.data.code === ApprovalFormType.verbal &&
        values.status.data.code === ApprovalStatus.processing &&
        (
          <Button clickHandler={onClickComplete} title="ЗАВЕРШИТЬ СОГЛАСОВАНИЕ" />
        )
      }
      {
        values.forma &&
        values.forma.data.code === ApprovalFormType.email &&
        values.status.data.code === ApprovalStatus.processing &&
        (
          <Button clickHandler={onClickEmail} title="СФОРМИРОВАТЬ ПИСЬМО" />
        )
      }
      {
        values.forma &&
        (values.forma.data.code === ApprovalFormType.email
          || values.forma.data.code === ApprovalFormType.paper
        ) &&
        values.status.data.code === ApprovalStatus.finished &&
        (
          <Button clickHandler={onClickSendEmail} title="Отправить Email" />
        )
      }
      {
        values.forma &&
        values.forma.data.code === ApprovalFormType.paper &&
        values.status.data.code === ApprovalStatus.processing &&
        (
          <Button clickHandler={onClickPaper} title="СФОРМИРОВАТЬ ГП В БЛАНКЕ" />
        )
      }
      {
        values.status.data.code === ApprovalStatus.processing &&
        (
          <Button
            clickHandler={onClickClose}
            buttonType="outline"
            title="АННУЛИРОВАТЬ"
          />
        )
      }
    </div >
  );
}

export default ApprovalButtons;
