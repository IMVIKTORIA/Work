export interface IInputData {
  value: string;
  data?: any;
}

import {
  ItemData,
  ItemDataString,
} from "../../UIKit/CustomList/CustomListTypes";

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
  code?: string;
  isLink?: boolean;
}
export interface ApprovalInfoCard {
  title: string;
  value: string;
  code?: any;
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
  revokeTask: InputDataCategory;
  revokeReason: InputDataCategory;
  isCollective: boolean;
  sortTask: boolean;
  isStatusRevokeTask: boolean;
  /** ID Отзыва */
  //revokeId: string;
  /** Тело файла */
  //fileSrc: string;

  constructor() {
    this.numberGP = new InputDataCategory();
    this.services = new InputDataCategory();
    this.term = new InputDataCategory();
    this.status = new InputDataCategory();
    this.forma = new InputDataCategory();
    this.cancelDate = new InputDataCategory();
    this.revokeTask = new InputDataCategory();
    this.revokeReason = new InputDataCategory();
    this.isCollective = false;
    this.sortTask = false;
    this.isStatusRevokeTask = false;
    // this.fileSrc = ''
  }
}
/** Данные отзыва согласования */
export class RevokeApprovalData {
  /** ID Согласования */
  approvalId: string;
  /** ID Отзыва */
  revokeId: string;
  /** Тело файла */
  fileSrc: string;

  constructor() {
    this.fileSrc = "";
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
  /** Выпущено (Отправлено) */
  finishedSend = "finishedSend",
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

export class InsuredListDataApproval {
  /** ФИО застрахованного */
  fullname?: ItemData;
  /** Дата рождения */
  birthdate?: ItemData;
  /** Полис */
  policy?: ItemData;
  /** Срок действия полиса */
  policyTerm?: ItemData;
  /** Номер согласования */
  appealNumb?: ItemData;

  constructor({
    fullname,
    birthdate,
    policy,
    policyTerm,
    appealNumb,
  }: InsuredListDataApproval) {
    this.fullname = fullname;
    this.birthdate = birthdate;
    this.policy = policy;
    this.policyTerm = policyTerm;
    this.appealNumb = appealNumb;
  }
}

export class InsuredListDataExtended extends InsuredListDataApproval {
  /** Номер согласования */
  appealNumber?: ItemDataString;
  constructor(props: InsuredListDataExtended) {
    super({ ...props });
    this.appealNumber = props.appealNumber;
  }
}
