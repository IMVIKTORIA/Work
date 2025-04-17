import React, { useEffect, useState } from "react";

import {
  ApprovalData,
  InputDataCategory,
  ListColumnData,
  getDetailsLayoutAttributes,
  ApprovalStatus,
} from "../../shared/types";
import CustomList from "../CustomList/CustomList";
import Scripts from "../../shared/utils/clientScripts";
import utils, { useMapState } from "../../shared/utils/utils";
import ApprovalDetails from "./ApprovalDetails/ApprovalDetails";
import Button from "../Button/Button";

/** Пропсы списка согласований */
type ApprovalsListProps = {
  /** id задачи */
  taskId: string;
  handler: any;
  isViewMode: any;
  saveStateHandler: any;
  setSelectedForma: any;
  onRowClick: any;
};

/** Список согласований */
function ApprovalsList({
  taskId,
  handler,
  isViewMode,
  saveStateHandler,
  setSelectedForma,
  onRowClick,
}: ApprovalsListProps) {
  const onClickRevokeTask = async (props: InputDataCategory) => {
    const taskId = props.data.code;
    if (!taskId) return;
    // Установка обращения
    const requestId = await Scripts.getRequestIdByTaskId(taskId);
    utils.setRequest(requestId);

    localStorage.setItem("taskId", taskId);

    // Переход
    // const link = await Scripts.getRequestLink()
    // utils.redirectSPA(link)
    const link = await Scripts.getRequestLink();
    const redirectUrl = new URL(window.location.origin + "/" + link);
    if (requestId) redirectUrl.searchParams.set("request_id", requestId);
    if (taskId) redirectUrl.searchParams.set("task_id", taskId);
    utils.redirectSPA(redirectUrl.toString());
    setTimeout(() => {
      window.location.reload();
    }, 300);
  };

  /** Колонки списка */
  const columns = [
    new ListColumnData({
      name: "Номер согласования",
      code: "numberGP",
      fr: 1,
      isSortable: false,
    }),
    new ListColumnData({
      name: "Согласованные услуги",
      code: "services",
      fr: 1.5,
      isSortable: false,
    }),
    new ListColumnData({
      name: "Срок действия",
      code: "term",
      fr: 1.5,
      isSortable: false,
    }),
    new ListColumnData({
      name: "Статус",
      code: "status",
      fr: 1,
      isSortable: false,
    }),
    new ListColumnData({
      name: "Форма",
      code: "forma",
      fr: 1.5,
      isSortable: false,
    }),
    new ListColumnData({
      name: "Дата отзыва",
      code: "cancelDate",
      fr: 1,
      isSortable: false,
    }),
    new ListColumnData({
      name: "Задача на отзыв",
      code: "revokeTask",
      fr: 1,
      isSortable: false,
      onClick: onClickRevokeTask,
      isLink: true,
    }),
    new ListColumnData({
      name: "Причина отзыва",
      code: "revokeReason",
      fr: 1,
      isSortable: false,
    }),
  ];

  // Данные формы деталей ДС
  const [amendmentValues, setAmendmentValue, setAmendmentValues] =
    useMapState<ApprovalData>(new ApprovalData());

  const getFilteredApprovals = async () => {
    const response = await Scripts.getApprovals(taskId);

    const filteredData = response.data.filter(
      (item: any) => item.status?.data?.code !== ApprovalStatus.nullified
    );

    return {
      ...response,
      data: filteredData,
      hasMore: response.hasMore,
    };
  };

  // Идентификатор согласования
  const [approvalId, setApprovalId] = useState<string | undefined>();

  // Перезагрузка карточки
  const reloadData = () => {
    setApprovalId(undefined);
    getFilteredApprovals().then((approvals) => {
      if (!approvals.data.length) return;

      const approval = approvals.data[0] as ApprovalData;
      setApprovalId(approval.id);
    });
  };

  // Получение идентификатора согласования
  useEffect(() => {
    console.log("Scripts.setReloadApprovalsCallback", reloadData);
    Scripts.setReloadApprovalsCallback(reloadData);
    reloadData();
  }, []);

  return (
    <div className="amendment-tab">
      {approvalId && (
        <ApprovalDetails
          approvalId={approvalId}
          reloadData={reloadData}
          values={amendmentValues}
          setValues={setAmendmentValues}
          setSelectedForma={setSelectedForma}
          onClickRevokeTask={onClickRevokeTask}
        />
      )}
    </div>
  );
}

export default ApprovalsList;
