import React from "react";
import Button from "../../../Button/Button";
import Scripts from "../../../../shared/utils/clientScripts";
import {
  ApprovalData,
  ApprovalFormType,
  ApprovalRowData,
  ApprovalStatus,
} from "../../../../shared/types";
import { showError } from "../../../../shared/utils/utils";
interface ApprovalButtonsProps {
  /** Установить видимость модалки email */
  setIsShowEmailModal: React.Dispatch<React.SetStateAction<boolean>>;
  /** Установить видимость модалки ГП на бланке */
  setIsShowPaperModal: React.Dispatch<React.SetStateAction<boolean>>;
  /** Данные строки списка согласований */
  data: ApprovalRowData;
  /** Данные согласования */
  values: ApprovalData;
  /** Обовление полных данных согласования */
  reloadFulldata: () => void;
}

/** Проект письма */
function ApprovalButtons({
  setIsShowEmailModal,
  setIsShowPaperModal,
  data,
  values,
  reloadFulldata,
}: ApprovalButtonsProps) {
  /** Отозвать согласование */
  const onClickRevoke = async () => {
    const isRevoked = await Scripts.revokeApproval(data.id);
    if (!isRevoked) {
      showError("Истек срок согласования, отзыв невозможен");
      return;
    }

    reloadFulldata();
  };

  /** Завершить согласование */
  const onClickComplete = async () => {
    // Изменить статус
    await Scripts.saveVerbalApproval(data.id);
    reloadFulldata();
  };

  /** Аннулировать согласование */
  const onClickClose = async () => {
    await Scripts.handleCloseApproval(data.id);
  };

  /** Отправить письмо */
  const onClickSendEmail = async () => {
    // Появляется модальное окно для отправки email
    await Scripts.sendInsuranceLetter(data.id);
  };

  /** Сформировать ГП на бланке */
  const onClickPaper = async () => {
    const [text, fileSrc] = await Promise.all([
      Scripts.generateEmailText(),
      Scripts.generateEmailFile(data.id),
    ]);
    await Scripts.savePaperApproval(data.id, text);

    reloadFulldata();
  };
  /** Сформировать письмо */
  const onClickEmail = async () => {
    const text = await Scripts.generateEmailText();
    await Scripts.saveEmailApproval(data.id, text);

    reloadFulldata();
  };

  return (
    <div className="approval-details__buttons">
      {values.status &&
        (values.status.data.code == ApprovalStatus.finished ||
          values.status.data.code == ApprovalStatus.finishedSend) && (
          <Button clickHandler={onClickRevoke} title="ОТОЗВАТЬ" />
        )}
      {values.forma &&
        values.forma.data.code === ApprovalFormType.verbal &&
        values.status.data.code === ApprovalStatus.processing && (
          <Button
            clickHandler={onClickComplete}
            style={{ backgroundColor: "#FF4545" }}
            title="ЗАВЕРШИТЬ"
          />
        )}
      {/* {values.forma &&
        values.forma.data.code === ApprovalFormType.email &&
        values.status.data.code === ApprovalStatus.processing && (
          <Button clickHandler={onClickEmail} title="СФОРМИРОВАТЬ ПИСЬМО" />
        )} */}
      {values.forma &&
        (values.forma.data.code === ApprovalFormType.email ||
          values.forma.data.code === ApprovalFormType.paper) &&
        (values.status.data.code == ApprovalStatus.finished ||
          values.status.data.code == ApprovalStatus.finishedSend) && (
          <Button
            clickHandler={onClickSendEmail}
            buttonType="outline"
            title="Отправить Email"
          />
        )}
      {/* {values.forma &&
        values.forma.data.code === ApprovalFormType.paper &&
        values.status.data.code === ApprovalStatus.processing && (
          <Button
            clickHandler={onClickPaper}
            title="СФОРМИРОВАТЬ ГП В БЛАНКЕ"
          />
        )} */}
      {values.status.data.code === ApprovalStatus.processing &&
        (values.forma.data.code === ApprovalFormType.email ||
          values.forma.data.code === ApprovalFormType.paper) && (
          <Button
            clickHandler={
              values.forma.data.code === ApprovalFormType.email
                ? onClickEmail
                : onClickPaper
            }
            title="ПОДТВЕРДИТЬ"
          />
        )}
      {values.status.data.code === ApprovalStatus.processing && (
        <Button
          clickHandler={onClickClose}
          buttonType="outline"
          title="АННУЛИРОВАТЬ"
        />
      )}
    </div>
  );
}

export default ApprovalButtons;
