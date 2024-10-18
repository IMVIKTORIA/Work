// /** Тип категория/элемент приложения */
// export interface ICategory {
// 	/** Код или идетификатор */
// 	code: string
// 	/** Название */
// 	name: string
// }

export interface IInputData {
  value: string;
  data?: any;
}

/** Значения полей формы общие */
export interface IFormDataGeneral {
  /** Видимость вкладки Согласования */
  isTabVisible: IInputData;
}

/** Значения полей формы */
export interface IFormData {
  /** Видимость вкладки Согласования */
  isTabVisible: boolean;
}

/** Значения полей формы ЛПУ */
export interface IFormDataLPU extends IFormDataGeneral {
  /** Договор */
  treaty: IInputData;
  /** Номер */
  number: IInputData;
  /** ЛПУ */
  lpu: IInputData;
  /** Тип договора */
  type: IInputData;
  /** Статус */
  status: IInputData;
  /** Дата заключения */
  conclusionDate: IInputData;
  /** Дата начала действия */
  startDate: IInputData;
  /** Стороны */
  sides: SideDataExtended[];
}

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

/** Сторона (С сохранением изначального состояния данных) */
export class SideDataExtended {
  originalData: SideData;
  actualData: SideData;
  isEdit: boolean;

  constructor(isEdit?: boolean) {
    // this.isEdit = !!isEdit
    this.originalData = new SideData();
    this.actualData = new SideData();
    this.isEdit = !!isEdit;
  }
}

/** Сторона */
export class SideData {
  type: InputDataCategory;
  contractor: InputDataString;
  // isEdit: boolean

  constructor(/* isEdit?: boolean */) {
    // this.isEdit = !!isEdit
    this.type = new InputDataCategory();
    this.contractor = new InputDataString();
  }
}

/** Значение поля ввода типа Строка */
export class InputDataString implements IInputData {
  value: string;
  data: null;

  constructor(value?: string) {
    this.value = value ?? "";
  }
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

/** Значения полей формы с уточненными типами полей */
export class TreatyFormData implements IFormData {
  treaty: InputDataCategory;
  objProduct: InputDataCategory;
  channel: InputDataCategory;
  currency: InputDataCategory;
  status: InputDataCategory;

  sides: SideDataExtended[];

  number: IInputData;
  policyHolder: IInputData;
  region: IInputData;
  conclusionDate: IInputData;
  startDate: IInputData;
  insuranceAmount: IInputData;
  insuranceAmountRub: IInputData;
  insurancePremium: IInputData;
  insurancePremiumRub: IInputData;

  constructor() {
    this.treaty = new InputDataCategory();
    this.objProduct = new InputDataCategory();
    this.channel = new InputDataCategory();
    this.currency = new InputDataCategory();
    this.status = new InputDataCategory();

    this.number = new InputDataString();
    this.policyHolder = new InputDataString();
    this.region = new InputDataCategory();
    this.conclusionDate = new InputDataString();
    this.startDate = new InputDataString();
    this.insuranceAmount = new InputDataString();
    this.insuranceAmountRub = new InputDataString();
    this.insurancePremium = new InputDataString();
    this.insurancePremiumRub = new InputDataString();
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

export interface TabProps {
  handler: any;
  values: IFormData;
  isViewMode: boolean;
  saveStateHandler: () => void;
  setActionHandlers: {
    setAddHandler: React.Dispatch<
      React.SetStateAction<(() => void) | undefined>
    >;
    setEditHandler: React.Dispatch<
      React.SetStateAction<(() => void) | undefined>
    >;
    setDeleteHandler: React.Dispatch<
      React.SetStateAction<(() => void) | undefined>
    >;
  };
}

export interface DetailsProps {
  data: any;
  values: any;
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
export class InsuranceLetterDetailsData {
  numberGP: InputDataCategory;
  services: InputDataCategory;
  conclusionDate: InputDataCategory;
  status: InputDataCategory;
  forma: InputDataCategory;
  startDate: InputDataCategory;

  constructor() {
    this.numberGP = new InputDataCategory();
    this.services = new InputDataCategory();
    this.conclusionDate = new InputDataCategory();
    this.status = new InputDataCategory();
    this.forma = new InputDataCategory();
    this.startDate = new InputDataCategory();
  }
}

/** Форма согласования */
export type Forma = {
  value: ApprovalFormType;
};

/** Формы согласования */
export enum ApprovalFormType {
  verbal = "Устное",
  email = "Email",
  paper = "ГП на бланке",
}
