import {
  FetchData,
  FetchItem,
  ItemData,
  ItemDataString,
} from "../../../UIKit/CustomList/CustomListTypes";
import ApprovalForm from "../../components/ApprovalForm/ApprovalForm";
import {
  InputDataCategory,
  ApprovalData,
  GetApprovalsResponse,
  AdditionalInfo,
  EmailPreviewData,
  ApprovalStatus,
  ApprovalFormType,
  InsuredListData,
  SortData,
  InsuredListDataExtended,
} from "../types";
import { fileSrc } from "./constants";

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
    status: new InputDataCategory("Оформление", ApprovalStatus.processing),
    /** Форма */
    forma: new InputDataCategory("ГП на бланке ", ApprovalFormType.paper),
    /** Дата отзыва */
    cancelDate: new InputDataCategory("10.05.2024"),
    /** Коллективное? */
    isCollective: true,
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
    { value: "Примечание", info: "-" },
    { value: "Исполнитель", info: "Юрасов Сергей Олегович" },
  ];

  await randomDelay();
  return labels;
}

/** Продолжить согласование */
async function handleContinueApproval(approvalId: string): Promise<void> {
  // Сменить статус
}

/** Аннулировать согласование */
async function handleCloseApproval(approvalId: string): Promise<void> {
  // Сменить статус
}

/** Ожидание */
function sleep(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}
/** Генерация текста для email */
async function generateEmailText(): Promise<string> {
  // TODO
  await sleep(1000);

  return `Добрый день! 

Согласованы услуги: подтягиваем инфо из Задачи, поле Согласованные слуги
Не согласованы услуги: подтягиваем инфо из Задачи, поле Несогласованные слуги (выводим только если поле заполнено, в противном случае не выводим всю строку)

Согласовал: подтягиваем инфо из задачи, поле Услуги согласовал`;
}
/** Генерация файла для гп на бланке */
async function generateEmailFile(approvalId: string): Promise<string> {
  // TODO
  await sleep(1000);

  return fileSrc;
}

/** Получение проекта письма */
async function getEmailPreview(approvalId: string): Promise<EmailPreviewData> {
  // TODO
  const text = await generateEmailText();

  return {
    text: text,
    fileSrc: "",
  };
}

/**  Удалить файл из гарантийного письма */
async function removeLetterFile(approvalId: string): Promise<void> {
  // TODO
  await sleep(1000);
}

/**  Сохранить форму ГП на бланке */
async function savePaperApproval(
  approvalId: string,
  text: string
): Promise<void> {
  // TODO
  await sleep(1000);
}

/**  Сохранить форму email */
async function saveEmailApproval(
  approvalId: string,
  text: string
): Promise<void> {
  // TODO
  await sleep(1000);
}

/**  Сохранить форму устное */
async function saveVerbalApproval(approvalId: string): Promise<void> {
  // TODO
  await sleep(1000);
}

/**  Открыть модальное окно отправки письма */
async function sendInsuranceLetter(approvalId: string): Promise<void> {
  // TODO
  await sleep(1000);
}

/** Функция обратного вызова для обновления списка обращений */
let reloadApprovalsCallback: () => void = () => {};
/** Обновить списка обращений */
async function reloadApprovalsList() {
  reloadApprovalsCallback();
}

/** Установить функцию обратного вызова для обновления списка обращений */
function setReloadApprovalsCallback(callback: () => void): void {
  reloadApprovalsCallback = callback;
}

/** Получение списка задач */
async function getInsuredList(
  page: number,
  sortData?: SortData
): Promise<FetchData<InsuredListData>> {
  await randomDelay();

  console.log({
    page,
    sortData,
  });

  const mockData: InsuredListData = {
    fullname: new ItemData({ value: "TS00000001/23", info: "test" }),
    birthdate: new ItemData({ value: "TS00000001/23", info: "test" }),
    phone: new ItemData({ value: "TS00000001/23", info: "test" }),
    email: new ItemData({ value: "TS00000001/23", info: "test" }),
    policy: new ItemData({ value: "TS00000001/23", info: "test" }),
    policyStartDate: new ItemData({ value: "TS00000001/23", info: "test" }),
    policyEndDate: new ItemData({ value: "TS00000001/23", info: "test" }),
    policyTerm: new ItemData({ value: "TS00000001/23", info: "test" }),
    policyRegion: new ItemData({ value: "TS00000001/23", info: "test" }),
    policyProduct: new ItemData({ value: "TS00000001/23", info: "test" }),
    plan: new ItemData({ value: "TS00000001/23", info: "test" }),
    moreButton: new ItemData({ value: "Подробнее", info: "test" }),
  };

  return {
    items: Array(20)
      .fill(0)
      .map((data, index) => {
        return {
          id: String(index),
          data: new InsuredListData(mockData),
        };
      }),
    hasMore: true,
  };
}

/** Получение проекта письма */
async function getApprovalInsuredList(
  approvalId: string
): Promise<FetchData<InsuredListDataExtended>> {
  // TODO
  const data: FetchData<InsuredListDataExtended> = await getInsuredList(0);
  const itemsExteded: FetchItem<InsuredListDataExtended>[] = data.items.map(
    (item, index) => {
      const newItemData = new InsuredListDataExtended({ ...item.data });
      newItemData.appealNumber = new ItemDataString(`TS1234/${index}G`);
      item.data = newItemData;

      return item;
    }
  );

  data.items = itemsExteded;

  return data;
}

type OpenApprovalCallback = (id: string) => void;
/** Функция обратного вызова для открытия согласования */
let setOpenApproval: OpenApprovalCallback | undefined;
/** Установить функцию обратного вызова для открытия согласования */
async function setOpenApprovalCallback(
  callback: OpenApprovalCallback
): Promise<void> {
  setOpenApproval = callback;
}

/** Отозвать согласование */
async function revokeApproval(approvalId: string): Promise<boolean> {
  // TODO
  await sleep(1000);

  return false
}

export default {
  getForma,
  getAdditionalInfo,
  getApprovals,
  getApprovalFulldata,
  setChangeTaskCallback,
  handleContinueApproval,
  handleCloseApproval,
  generateEmailText,
  getEmailPreview,
  generateEmailFile,
  removeLetterFile,
  savePaperApproval,
  saveEmailApproval,
  saveVerbalApproval,
  sendInsuranceLetter,

  setReloadApprovalsCallback,
  getInsuredList,
  getApprovalInsuredList,
  setOpenApprovalCallback,
  revokeApproval,
};
