import React from "react";
import { AdditionalInfo } from "../../shared/types";

interface LabledFieldProps {
  data: {
    [key: string]: AdditionalInfo;
  };
  onClick?: (info: any) => void;
}

function LabledField({ data, onClick }: LabledFieldProps) {
  if (!data || Object.keys(data).length === 0) {
    return;
  }

  return (
    <div className="labled-field">
      {Object.entries(data).map(([label, item]) => (
        <div key={label} className="labled-field__item">
          <div className="labled-field__row">
            <div className="labled-field__label">{label}</div>
            <div
              className={`labled-field__children ${
                item.isLink ? "labled-field__link" : ""
              }`}
            >
              {item.isLink ? (
                <span
                  className="link-text"
                  onClick={() => onClick && onClick(item.info)}
                >
                  {item.info}
                </span>
              ) : (
                item.info
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default LabledField;
