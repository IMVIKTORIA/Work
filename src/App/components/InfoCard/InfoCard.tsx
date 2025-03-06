import React from "react";
import {
  ApprovalFormType,
  ApprovalStatus,
  ApprovalInfoCard,
} from "../../shared/types";
import icons from "../../shared/icons";

interface InfoCardProps {
  data: ApprovalInfoCard[];
}

const statusIcons = {
  [ApprovalStatus.processing]: icons.statusProcess,
  [ApprovalStatus.finished]: icons.statusFinish,
  [ApprovalStatus.finishedSend]: icons.statusFinishSend,
  [ApprovalStatus.nullified]: icons.statusNullified,
  [ApprovalStatus.cancelled]: icons.statusCancelled,
};

const formIcons = {
  [ApprovalFormType.verbal]: icons.VerbalIcon,
  [ApprovalFormType.email]: icons.EmailIcon,
  [ApprovalFormType.paper]: icons.PaperIcon,
};

function InfoCard({ data }: InfoCardProps) {
  const isDateInFuture = (dateString: string): boolean => {
    const date = new Date(dateString.split(".").reverse().join("-"));
    const currentDate = new Date();
    return date > currentDate;
  };

  return (
    <div className="info-card">
      {data.map(({ title, value, code }) => {
        const isApprovalDate = title === "Срок согласования";
        const isPastDate = isApprovalDate && code && !isDateInFuture(code);

        return (
          <div key={title} className="info-card__item">
            <div className="info-card__title">{title}</div>
            <div className="info-card__icons">
              {code && statusIcons[code as ApprovalStatus]}
              {code && formIcons[code as ApprovalFormType]}
              <div className="info-card__value">
                {isApprovalDate ? (
                  <span style={{ color: isPastDate ? "red" : "inherit" }}>
                    {value}
                  </span>
                ) : (
                  value
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default InfoCard;
