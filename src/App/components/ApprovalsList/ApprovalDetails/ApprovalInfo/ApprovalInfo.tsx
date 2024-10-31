import React from "react";
import Button from "../../../Button/Button";
import Scripts from "../../../../shared/utils/clientScripts";
import { ApprovalData, ApprovalFormType, ApprovalRowData, ApprovalStatus } from "../../../../shared/types";
import Panel from "../../../Panel/Panel";
import LabledField from "../../../LabledField/LabledField";
interface ApprovalInfoProps {
  labels: {}
}

/** Информация согласования */
function ApprovalInfo({ labels }: ApprovalInfoProps) {

  return (
    < div className="approval-details_panel" >
      <Panel label="Информация" isOpen={true}>
        <LabledField data={labels} />
      </Panel>
    </div >
  );
}

export default ApprovalInfo;
