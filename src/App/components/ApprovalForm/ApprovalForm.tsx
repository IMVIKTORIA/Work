import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import { ApprovalFormType, Forma, ApprovalData } from "../../shared/types";
import Scripts from "../../shared/utils/clientScripts";
import ApprovalsList from "../ApprovalsList/ApprovalsList";

/** Форма вкладки согласования в задаче */
export default function ApprovalForm() {
  const [isViewMode, setIsViewMode] = useState<boolean>(true);

  // Идентификатор текущей задачи
  const [taskId, setTaskId] = useState<string>(/* "test" */);
  // Данные выбранного гарантийного письма
  const [selectedForma, setSelectedForma] = useState<Forma | null>(null);
  const [isButtonVisible, setIsButtonVisible] = useState(true);
  const [approvalList, setApprovalList] = useState<Forma[]>([]);
  const [approvalsData, setApprovalsData] = useState<ApprovalData[]>([]); // Для хранения списка ГП

  const handleRowClick = (forma) => {
    setSelectedForma(forma);
    if (forma.value) {
      setIsButtonVisible(true); // Показываем кнопку
    } else {
      setIsButtonVisible(false); // Скрываем кнопку
    }
  };

  // Запись callback изменения задачи
  React.useLayoutEffect(() => {
    const changeTaskCallback = (taskId?: string) => setTaskId(taskId);
    Scripts.setChangeTaskCallback(changeTaskCallback);

    return () => Scripts.setChangeTaskCallback();
  }, []);

  // При изменении taskId
  useEffect(() => {
    if (!taskId) return;
    const fetchApprovalsData = async () => {
      const response = await Scripts.getApprovals(taskId);
      setApprovalsData(response.data); // Сохраняем данные в состояние
    };

    fetchApprovalsData();
  }, [taskId]);

  /** Сохранить состояние в localStorage TODO: Скорее всего не нужно*/
  const saveState = () => {
    // const dataValues = values
    // const dataIsViewMode = isViewMode
    // const dataActiveTabCode = activeTabCode
    // const data = JSON.stringify({
    // 	values: dataValues,
    // 	isViewMode: dataIsViewMode,
    // 	activeTabCode: dataActiveTabCode,
    // 	selectedForma: selectedForma,
    // })
    // localStorage.setItem(localStorageDraftKey, data)
    // localStorage.setItem(localStorageIdKey, values.treaty.data.code)
  };

  /** Закрытие задачи */
  const handleCloseTreaty = () => {
    history.back();
  };

  return (
    taskId && (
      <div className="approval-form">
        <ApprovalsList
          taskId={taskId}
          handler={() => { }}
          isViewMode={isViewMode}
          saveStateHandler={saveState}
          setSelectedForma={setSelectedForma}
          onRowClick={handleRowClick}
        />
        <div className="approval-form__buttons">
          {selectedForma && selectedForma.value === ApprovalFormType.verbal && (
            <Button clickHandler={""} title="ЗАВЕРШИТЬ СОГЛАСОВАНИЕ" />
          )}
          {selectedForma && selectedForma.value === ApprovalFormType.email && (
            <Button clickHandler={""} title="СФОРМИРОВАТЬ ПИСЬМО" />
          )}
          {selectedForma && selectedForma.value === ApprovalFormType.paper && (
            <>
              <Button clickHandler={""} title="СФОРМИРОВАТЬ ГП В WORD" />
              <Button clickHandler={""} title="СФОРМИРОВАТЬ ГП В PDF" />
            </>
          )}
          <Button
            clickHandler={handleCloseTreaty}
            buttonType="outline"
            title="АННУЛИРОВАТЬ"
          />
        </div>
      </div>
    )
  );
}
