import React from "react";
import LabledField from "../../../LabledField/LabledField";
import InfoCard from "../../../InfoCard/InfoCard";
import { ApprovalInfoCard } from "../../../../shared/types";
interface ApprovalInfoProps {
  labels: {};
  info: ApprovalInfoCard[];
  onClick?: (info: any) => void;
}

/** Информация согласования */
function ApprovalInfo({ labels, info, onClick }: ApprovalInfoProps) {
  return (
    <div className="approval-details_panel">
      <InfoCard data={info} />
      <LabledField data={labels} onClick={onClick} />
    </div>
  );
}

export default ApprovalInfo;
