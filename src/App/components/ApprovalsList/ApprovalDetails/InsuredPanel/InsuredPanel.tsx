import React, { useEffect, useState } from "react";
import Panel from "../../../Panel/Panel";
import Button from "../../../Button/Button";
import { ButtonType, EmailPreviewData } from "../../../../shared/types";
import { copy } from "../../../../shared/utils/utils";
import FileViewer from "../../../InsuranceLetterModal/FileViewer/FileViewer";
import InsuredList, { InsuredListProps } from "../../../InsuredList/InsuredList";

/** Список застрахованных */
function InsuredPanel(props: InsuredListProps) {

  return (
    <div className="approval-details_panel">
      <Panel label="Застрахованные" isOpen={false}>
        <div className="approval-details_panel__content" style={{ padding: "0" }}>
          <InsuredList {...props} />
        </div>
      </Panel>
    </div>
  );
}

export default InsuredPanel;
