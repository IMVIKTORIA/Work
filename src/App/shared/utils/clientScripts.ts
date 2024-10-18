/**
 * TODO: убрать лишнюю логику
 */
import { InputDataCategory, InputDataString } from "../types";

/** Заглушка ожидания ответа сервера */
function randomDelay() {
  const delay = Math.random() * 1000;
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

/** Получение списка форм */
async function getForma() {
  const data = [
    {
      value: "Устное",
      data: {
        code: "018e7fa6-010e-712b-aecd-d07441142e97",
      },
    },
    {
      value: "Email",
      data: {
        code: "018e7fa6-46b6-7345-927e-d07cb06e3107",
      },
    },
    {
      value: "ГП на бланке",
      data: {
        code: "018e7fa6-5a9f-7ee2-a81c-1b7ec10031f3",
      },
    },
  ];

  await randomDelay();
  return data;
}

/** Получение списка статусов */
async function saveTreaty(data) {
  await randomDelay();
  console.log(data);
}

/** Получение списка статусов */
async function getTreaty() {
  const data = {
    treaty: {
      value: "test",
      data: {
        code: "018e7fa6-5a9f-7ee2-a81c-1b7ec10031f3",
      },
    },
    number: {
      value: "test",
    },
    policyHolder: {
      value: "test",
      data: {
        code: "018e7fa6-5a9f-7ee2-a81c-1b7ec10031f3",
      },
    },
    objProduct: {
      value: "Aenean tellus elit leo consectetur",
      data: {
        code: "018e7fa6-5a9f-7ee2-a81c-1b7ec10031f3",
      },
    },
    channel: {
      value: "channelTest",
      data: {
        code: "channelTest",
      },
    },
    region: {
      value: "test",
    },
    currency: {
      value: "currencyTest",
      data: {
        code: "currencyTest",
      },
    },
    status: {
      value: "Еще статус",
      data: {
        code: "eshe_status",
      },
    },
    conclusionDate: {
      value: "28.03.2024",
    },
    startDate: {
      value: "28.03.2024",
    },
    insuranceAmount: {
      value: "",
    },
    insuranceAmountRub: {
      value: "",
    },
    insurancePremium: {
      value: "",
    },
    insurancePremiumRub: {
      value: "",
    },
    sides: [
      {
        isEdit: false,
        originalData: {
          type: {
            value: "Менеджер договора",
            data: {
              code: "manager",
            },
          },
          contractor: {
            value: "Иванов Иван Иванович",
          },
        },
        actualData: {
          type: {
            value: "Менеджер договора",
            data: {
              code: "manager",
            },
          },
          contractor: {
            value: "Иванов Иван Иванович",
          },
        },
      },
      {
        isEdit: false,
        originalData: {
          type: {
            value: "Медицинский куратор",
            data: {
              code: "medical",
            },
          },
          contractor: {
            value: "Петров Петр Петрович",
            data: {
              code: "42515215",
            },
          },
        },
        actualData: {
          type: {
            value: "Медицинский куратор",
            data: {
              code: "medical",
            },
          },
          contractor: {
            value: "Петров Петр Петрович",
            data: {
              code: "42515215",
            },
          },
        },
      },
      {
        isEdit: true,
        originalData: {
          type: {
            value: "Технический куратор",
            data: {
              code: "technical",
            },
          },
          contractor: {
            value: "Плюшкин Лев Николаевич",
            data: {
              code: "4643645654",
            },
          },
        },
        actualData: {
          type: {
            value: "Технический куратор",
            data: {
              code: "technical",
            },
          },
          contractor: {
            value: "Плюшкин Лев Николаевич",
            data: {
              code: "4643645654",
            },
          },
        },
      },
    ],
  };
  await randomDelay();
  return data;
}

/** Получение ссылки на форму контрагента */
function getContractorPageLink() {
  const pageLink = "#test";
  return pageLink;
}

/** Создание Плана страхования */
async function createPlan(values) {
  console.log(values);
  await randomDelay();
}

/** Получение ДС */
const getAmendments = async (page) => {
  const mockData = {
    /** Идентификатор */
    id: "1",
    /** Номер договора */
    numberGP: new InputDataCategory("TS000025/24", "treaty_id"),
    /** Доп. соглашение */
    services: new InputDataCategory("Диагностика обследование", "amendment_id"),
    /** Дата подписания */
    conclusionDate: new InputDataCategory("01.01.2024-01.02.2024"),
    /** Тип ДС */
    status: new InputDataCategory("Оформление", "type_id"),
    /** Статус */
    forma: new InputDataCategory("Устное", "status_code"),
    /** Дата начала */
    startDate: new InputDataCategory("10.05.2024"),
  };

  await randomDelay();
  return {
    data: Array(5)
      .fill()
      .map((data, index) => {
        return { ...mockData, id: index };
      }),
    hasMore: false,
  };
};

/** Получение полных данных плана по идентификатору */
// TODO: Переименовать типизировать
async function getAmendmentFulldata(id) {
  const mockData = {
    /** Идентификатор */
    id: "1",
    /** Номер договора */
    numberGP: new InputDataCategory("TS000025/24", "treaty_id"),
    /** Доп. соглашение */
    services: new InputDataCategory("Диагностика обследование", "amendment_id"),
    /** Дата подписания */
    conclusionDate: new InputDataCategory("01.01.2024-01.02.2024"),
    /** Тип ДС */
    status: new InputDataCategory("Оформление", "type_id"),
    /** Статус */
    forma: new InputDataCategory(" ", "status_code"),
    /** Дата начала */
    startDate: new InputDataCategory("10.05.2024"),
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

// TODO: Типизировать
async function getLabel() {
  const labels = [
    { label: "Дата выпуска согласования", children: "10.03.24" },
    { label: "Дата начала действия согласования", children: "03.10.2024" },
    { label: "Дата окончания действия согласования", children: "01.11.24" },
    { label: "Номер согласования", children: "TS000025/24" },
    { label: "Наименование ЛПУ", children: 'ООО "МедКлиникСервис"' },
    { label: "Наименование ТОУ", children: '"Клиника здоровья"' },
    { label: "Номер договора с ЛПУ", children: "PHP00000258" },
    { label: " ФИО застрахованного", children: "Иванов Иван Иванович" },
    { label: "Дата рождения застрахованного", children: "21.12.1995" },
    { label: "Номер страхового полиса", children: "VMI000012/5" },
    { label: "Срок действия полиса", children: "12.12.2023-11.12.2024" },
    { label: "Страхователь", children: 'ООО "Росавтодор"' },
    { label: "Номер договора страхования", children: "VMI000012" },
    { label: "Диагноз", children: "Ишемическая болезнь сердца" },
    { label: "Код МКБ", children: "l25" },
    { label: "Согласованные услуги", children: "Диагностика, обследование" },
    { label: "Адрес вызова", children: "-" },
    { label: "Контактный телефон", children: "+79005006030" },
    { label: "Дополнительная информация", children: "-" },
    { label: "Исполнитель", children: "Юрасов Сергей Олегович" },
  ];

  await randomDelay();
  return labels;
}

export default {
  getForma,
  getLabel,
  saveTreaty,
  getTreaty,
  getContractorPageLink,
  createPlan,
  getAmendments,
  getAmendmentFulldata,
  setChangeTaskCallback,
};
