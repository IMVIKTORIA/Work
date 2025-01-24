import React, { useCallback, useEffect, useState } from "react";
import { IInputData } from "../types";
import Scripts from "./clientScripts";

/** Маршрутизация по SPA */
export const redirectSPA = (href: string) => {
  let element = document.createElement("a");
  element.href = href;
  element.style.display = "none";
  document.querySelector("body")?.appendChild(element);
  element.click();
  element.remove();
};

/** Запись идентификатора обращения в localStorage
 * @param id Идентификатор обращения
 */
async function setRequest(id: string) {
	localStorage.setItem('currentRequestId', id)
	localStorage.setItem('currentContractorId', '')
	localStorage.setItem('currentContractorPhone', '')
}


export default {
  setRequest,
  redirectSPA,
};

/** Значения полей формы */
export interface IMap {}

/** Создание функции изменения состояния объекта со значениями формы */
export const useMapState = <T>(
  initialValue: T | (() => T)
): [T, (name: string, value: IInputData) => void, (values: T) => void] => {
  const [state, setState] = useState<T>(initialValue);

  /** Установка значений всех полей формы */
  const setValues = React.useCallback((values: T) => {
    setState(values);
  }, []);

  /** Установка одного значения формы */
  const setValue = React.useCallback((name: string, value: any) => {
    setState(
      (currentState) => (currentState = { ...currentState, [name]: value } as T)
    );
  }, []);

  return [state, setValue, setValues];
};

/** Открыть карточку контрагента */
export const openContractorPage = (id?: string) => {
  id
    ? localStorage.setItem("medpultContractorId", id)
    : localStorage.removeItem("medpultContractorId");
};

export function useDebounce<ValueType = any>(
  value: ValueType,
  delay: number
): ValueType {
  // Состояние и сеттер для отложенного значения
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
    () => {
      // Выставить debouncedValue равным value (переданное значение)
      // после заданной задержки
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Вернуть функцию очистки, которая будет вызываться каждый раз, когда ...
      // ... useEffect вызван снова. useEffect будет вызван снова, только если ...
      // ... value будет изменено (смотри ниже массив зависимостей).
      // Так мы избегаем изменений debouncedValue, если значение value ...
      // ... поменялось в рамках интервала задержки.
      // Таймаут очищается и стартует снова.
      // Что бы сложить это воедино: если пользователь печатает что-то внутри ...
      // ... нашего приложения в поле поиска, мы не хотим, чтобы debouncedValue...
      // ... не менялось до тех пор, пока он не прекратит печатать дольше, чем 500ms.
      return () => {
        clearTimeout(handler);
      };
    },
    // Вызывается снова, только если значение изменится
    // мы так же можем добавить переменную "delay" в массива зависимостей ...
    // ... если вы собираетесь менять ее динамически.
    [value]
  );

  return debouncedValue;
}

/** Копировать текст в буфер обмена */
export const copy = (text: string) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text);
  } else {
    const input = document.createElement("textarea");
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand("copy");
    document.body.removeChild(input);
  }
};

/** Показать уведомление об ошибке */
export const showError = (text: string) => {
  if((window as any).showError) {
    (window as any).showError(text)

    return
  }

  alert(text)
};
