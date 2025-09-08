import React from "react";
import Button from "../../../Button/Button";
import Scripts from "../../../../shared/utils/clientScripts";
import {
  ApprovalData,
  ApprovalFormType,
  ApprovalRowData,
  ApprovalStatus,
} from "../../../../shared/types";

interface ApprovalButtonsProps {
  /** Идентификатор согласования */
  approvalId: string;
  /** Данные согласования */
  values: ApprovalData;
  /** Обовление полных данных согласования */
  reloadFulldata: () => void;
}

/** Проект письма */
function ApprovalButtons({
  approvalId,
  values,
  reloadFulldata,
}: ApprovalButtonsProps) {
  /** Отозвать согласование */
  const onClickRevoke = async () => {
    const isRevoked = await Scripts.revokeApproval(approvalId);
    if (!isRevoked) {
      //showError("Истек срок согласования, отзыв невозможен");
      return;
    }

    reloadFulldata();
  };

  /** Завершить согласование */
  const onClickComplete = async () => {
    // Изменить статус
    await Scripts.saveVerbalApproval(approvalId);
    reloadFulldata();
  };

  /** Аннулировать согласование */
  const onClickClose = async () => {
    await Scripts.handleCloseApproval(approvalId);
  };

  /** Отправить письмо */
  const onClickSendEmail = async () => {
    // Появляется модальное окно для отправки email
    await Scripts.sendInsuranceLetter(approvalId);
  };

  /** Сформировать ГП на бланке */
  const onClickPaper = async () => {
    const [text, fileSrc] = await Promise.all([
      Scripts.generateEmailText(),
      Scripts.generateEmailFile(approvalId),
    ]);
    await Scripts.savePaperApproval(approvalId, text);

    reloadFulldata();
  };
  /** Сформировать письмо */
  const onClickEmail = async () => {
    const text = await Scripts.generateEmailText();
    await Scripts.saveEmailApproval(approvalId, text);

    reloadFulldata();
  };

  /** Подтвердить в задаче на отзыв */
  const onClickСonfirm = async () => {
    await Scripts.RevokeDataConfirmClick(values.revokeTask);
  };
  /** Отправить в задаче на отзыв */
  const onClickSendRevoke = async () => {
    await Scripts.RevokeDataSendClick(values.revokeTask);
  };

  return (
    <div className="approval-details__buttons">
      {values.status &&
        !values.sortTask &&
        values.isStatusTask &&
        (values.status.data.code == ApprovalStatus.finished ||
          values.status.data.code == ApprovalStatus.finishedSend) && (
          <Button
            clickHandler={onClickRevoke}
            title="ОТОЗВАТЬ"
            style={{ backgroundColor: "#FF4545" }}
          />
        )}
      {values.forma &&
        values.forma.data.code === ApprovalFormType.verbal &&
        values.status.data.code === ApprovalStatus.processing && (
          <Button clickHandler={onClickComplete} title="ПОДТВЕРДИТЬ" />
        )}
      {/* {values.forma &&
        values.forma.data.code === ApprovalFormType.email &&
        values.status.data.code === ApprovalStatus.processing && (
          <Button clickHandler={onClickEmail} title="СФОРМИРОВАТЬ ПИСЬМО" />
        )} */}
      {values.forma &&
        !values.sortTask &&
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
      {(values.status.data.code === ApprovalStatus.processing || (values.status.data.code === ApprovalStatus.finished && values.forma.data.code !== ApprovalFormType.verbal )) && (
        <Button
          clickHandler={onClickClose}
          buttonType="outline"
          title="АННУЛИРОВАТЬ"
        />
      )}
      {/* В задаче на отзыв */}
      {values.sortTask &&
        values.isStatusRevokeTask &&
        (values.status.data.code == ApprovalStatus.finished ||
          values.status.data.code == ApprovalStatus.finishedSend) && (
          <Button clickHandler={onClickСonfirm} title="ПОДТВЕРДИТЬ" />
        )}
      {values.sortTask &&
        values.isStatusRevokeTask &&
        values.status.data.code == ApprovalStatus.cancelled &&
        values.forma.data.code !== ApprovalFormType.verbal && (
          <Button clickHandler={onClickSendRevoke} title="Отправить Email" />
        )}
    </div>
  );
}

export default ApprovalButtons;
