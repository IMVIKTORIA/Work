import {
  InputDataCategory,
  ApprovalData,
  GetApprovalsResponse,
  AdditionalInfo,
} from "../types";

/** Заглушка ожидания ответа сервера */
function randomDelay() {
  const delay = Math.random() * 1000;
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

/** Получение списка форм */
async function getForma(): Promise<InputDataCategory[]> {
  const data: InputDataCategory[] = [
    new InputDataCategory("Устное", "verbal"),
    new InputDataCategory("Email", "email"),
    new InputDataCategory("ГП на бланке", "gp"),
  ];

  await randomDelay();
  return data;
}

/** Получение Согласований */
async function getApprovals(taskId: string): Promise<GetApprovalsResponse> {
  const mockData: ApprovalData = {
    /** Идентификатор */
    id: taskId,
    /** Номер ГП */
    numberGP: new InputDataCategory("TS000025/24", "number_id"),
    /** Согласованные услуги */
    services: new InputDataCategory(
      "Диагностика обследование",
      "services_code"
    ),
    /** Срок действия */
    term: new InputDataCategory("01.01.2024-01.02.2024"),
    /** Статус */
    status: new InputDataCategory("Оформление", "status_code"),
    /** Форма */
    forma: new InputDataCategory("Устное", "forma_code"),
    /** Дата отзыва */
    cancelDate: new InputDataCategory("10.05.2024"),
  };

  await randomDelay();
  return {
    data: Array(5)
      .fill(null)
      .map((data, index) => {
        return { ...mockData, id: `${taskId}-${index}` };
      }),
    hasMore: false,
  };
}

/** Получение полных Согласований */
async function getApprovalFulldata(approvalId: string): Promise<ApprovalData> {
  const mockData: ApprovalData = {
    /** Идентификатор */
    id: approvalId,
    /** Номер ГП */
    numberGP: new InputDataCategory("TS000025/24", "number_id"),
    /** Согласованные услуги */
    services: new InputDataCategory(
      "Диагностика обследование",
      "services_code"
    ),
    /** Срок действия */
    term: new InputDataCategory("01.01.2024-01.02.2024"),
    /**Статус */
    status: new InputDataCategory("Оформление", "status_code"),
    /** Форма */
    forma: new InputDataCategory("Устное ", "forma_code"),
    /** Дата отзыва */
    cancelDate: new InputDataCategory("10.05.2024"),
  };

  await randomDelay();
  return mockData;
}

type SetVisibilityCallback = (taskId?: string) => void;
let changeTaskCallback: SetVisibilityCallback | undefined;

/** Установить функцию обратного вызова для изменения id задачи */
function setChangeTaskCallback(callback?: SetVisibilityCallback): void {
  changeTaskCallback = callback;
}

/** Получение дополнительной информации */
async function getAdditionalInfo(
  approvalId: string
): Promise<AdditionalInfo[]> {
  const labels: AdditionalInfo[] = [
    { value: "Дата выпуска согласования", info: "10.03.24" },
    { value: "Дата начала действия согласования", info: "03.10.2024" },
    { value: "Дата окончания действия согласования", info: "01.11.24" },
    { value: "Номер согласования", info: "TS000025/24" },
    { value: "Наименование ЛПУ", info: 'ООО "МедКлиникСервис"' },
    { value: "Наименование ТОУ", info: '"Клиника здоровья"' },
    { value: "Номер договора с ЛПУ", info: "PHP00000258" },
    { value: " ФИО застрахованного", info: "Иванов Иван Иванович" },
    { value: "Дата рождения застрахованного", info: "21.12.1995" },
    { value: "Номер страхового полиса", info: "VMI000012/5" },
    { value: "Срок действия полиса", info: "12.12.2023-11.12.2024" },
    { value: "Страхователь", info: 'ООО "Росавтодор"' },
    { value: "Номер договора страхования", info: "VMI000012" },
    { value: "Диагноз", info: "Ишемическая болезнь сердца" },
    { value: "Код МКБ", info: "l25" },
    { value: "Согласованные услуги", info: "Диагностика, обследование" },
    { value: "Адрес вызова", info: "-" },
    { value: "Контактный телефон", info: "+79005006030" },
    { value: "Дополнительная информация", info: "-" },
    { value: "Исполнитель", info: "Юрасов Сергей Олегович" },
  ];

  await randomDelay();
  return labels;
}

export default {
  getForma,
  getAdditionalInfo,
  getApprovals,
  getApprovalFulldata,
  setChangeTaskCallback,
};
