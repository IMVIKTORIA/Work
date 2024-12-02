export interface IInputData {
  value: string;
  data?: any;
}

import { ItemData, ItemDataString } from "../../UIKit/CustomList/CustomListTypes";

/** Данные столбца таблицы */
export class ListColumnData {
  /** Коэффициент соотношения ширины столбца */
  fr: number;
  /** Можно ли по этому столбцу сортировать */
  isSortable: boolean;
  /** Хранит ли по столбец ссылки */
  isLink: boolean;
  /** Название столбца */
  name: string;
  /** Код значения */
  code: string;
  /** Обработчик нажатия */
  onClick?: (props: any) => any;

  constructor({
    name,
    code,
    fr,
    isSortable,
    isLink,
    onClick,
  }: {
    name: string;
    code: string;
    fr?: number;
    isSortable?: boolean;
    isLink?: boolean;
    onClick?: (props: any) => any;
  }) {
    this.fr = fr ?? 1;
    this.isSortable = isSortable ?? false;
    this.isLink = isLink ?? false;

    if (onClick) this.onClick = onClick;

    this.name = name;
    this.code = code;
  }
}

export interface CustomInputProps extends React.ComponentProps<"input"> {
  values: { [key: string]: any };
  name: string;
  buttons?: any;
  inputHandler?: (name: string, value: any) => void;
  clickHandler?: (ev) => void;
  cursor?: string;
  isOpen?: boolean;
  wrapperRef?: React.RefObject<HTMLDivElement>;
  readOnly?: boolean;
  isViewMode?: boolean;
  placeholder?: string;
  maskFunction?: (value: string) => string;
  getValueHandler?: (props: CustomInputProps) => string;
  isInvalid?: boolean;
  customClassname?: string;
}

/** Значение поля ввода типа Категория */
export class InputDataCategory implements IInputData {
  value: string;
  data: {
    code: string;
  };

  constructor(value?: string, code?: string) {
    this.value = value ?? "";
    this.data = { code: code ?? "" };
  }
}

/** Данные сортировки */
export class SortData {
  code: string;
  isAscending: boolean;

  constructor({ code, isAscending }: { code?: string; isAscending?: boolean }) {
    this.code = code ?? "";
    this.isAscending = isAscending ?? true;
  }
}

export interface DetailsProps {
  data: any;
  values: any;
}

export interface AdditionalInfo {
  value: string;
  info: string;
}

/** Атрибуты функции получения разметки деталей строки динамического списка */
export interface getDetailsLayoutAttributes {
  /** Сокращенные данные строки */
  rowData?: any;
  /** Обработчик нажатия на строку */
  onClickRowHandler?: any;
  /** Перезагрузка списка */
  reloadData: () => void;
}

/** Детальные данные Гарантийного письма */
export class ApprovalData {
  id: string;
  numberGP: InputDataCategory;
  services: InputDataCategory;
  term: InputDataCategory;
  status: InputDataCategory;
  forma: InputDataCategory;
  cancelDate: InputDataCategory;
  isCollective: boolean;

  constructor() {
    this.numberGP = new InputDataCategory();
    this.services = new InputDataCategory();
    this.term = new InputDataCategory();
    this.status = new InputDataCategory();
    this.forma = new InputDataCategory();
    this.cancelDate = new InputDataCategory();
    this.isCollective = false;
  }
}

/** Данные проекта письма */
export class EmailPreviewData {
  /** Текст письма */
  text: string;
  /** Файл письма */
  fileSrc: string;

  constructor() {
    this.text = "";
    this.fileSrc = "";
  }
}

/** интерфейс для возвращаемого значения функции */
export interface GetApprovalsResponse {
  data: ApprovalData[];
  hasMore: boolean;
}

/** Форма согласования */
export type Forma = {
  value: ApprovalFormType;
};

/** Формы согласования */
export enum ApprovalFormType {
  verbal = "verbal",
  email = "email",
  paper = "gp",
}

export enum ButtonType {
  outline = "outline",
}

/** Статус согласования */
export enum ApprovalStatus {
  /** В оформлении */
  processing = "processing",
  /** Выпущено */
  finished = "finished",
  /** Аннулировано */
  nullified = "nullified",
  /** Отозвано */
  cancelled = "cancelled",
}

/** Данные строки списка согласования */
export interface ApprovalRowData {
  id: string;
  numberGP: InputDataCategory;
  services: InputDataCategory;
  term: InputDataCategory;
  status: InputDataCategory;
  forma: InputDataCategory;
  cancelDate: InputDataCategory;
}

export class InsuredListData {
  /** ФИО застрахованного */
  fullname?: ItemData;
  /** Дата рождения */
  birthdate?: ItemData;
  /** Телефон */
  phone?: ItemData;
  /** Email */
  email?: ItemData;
  /** Полис */
  policy?: ItemData;
  /** Дата начала действия полиса */
  policyStartDate?: ItemData;
  /** Дата окончания действия полиса */
  policyEndDate?: ItemData;
  /** Срок действия полиса */
  policyTerm?: ItemData;
  /** Регион действия полиса */
  policyRegion?: ItemData;
  /** Продукт */
  policyProduct?: ItemData;
  /** План страхования */
  plan?: ItemData;
  /** Кнопка Подробнее, при нажатии на которую происходит переход на форму данного Контрагента (по аналогии с кнопкой Подробнее в текущей реализации) */
  moreButton?: ItemData;

  constructor({
    fullname,
    birthdate,
    phone,
    email,
    policy,
    policyStartDate,
    policyEndDate,
    policyTerm,
    policyRegion,
    policyProduct,
    plan,
    moreButton,
  }: InsuredListData) {
    this.fullname = fullname;
    this.birthdate = birthdate;
    this.phone = phone;
    this.email = email;
    this.policy = policy;
    this.policyStartDate = policyStartDate;
    this.policyEndDate = policyEndDate;
    this.policyTerm = policyTerm;
    this.policyRegion = policyRegion;
    this.policyProduct = policyProduct;
    this.plan = plan;
    this.moreButton = moreButton;
  }
}
