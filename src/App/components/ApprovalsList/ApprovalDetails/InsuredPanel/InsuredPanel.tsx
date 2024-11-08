import React, { useEffect, useState } from "react";
import Panel from "../../../Panel/Panel";
import Button from "../../../Button/Button";
import { ButtonType, EmailPreviewData } from "../../../../shared/types";
import { copy } from "../../../../shared/utils/utils";
import FileViewer from "../../../InsuranceLetterModal/FileViewer/FileViewer";
import InsuredList from "../../../InsuredList/InsuredList";

interface InsuredPanelProps {
  selectedContractorsIds: string[],
  setSelectedContractorsIds: (ids: string[]) => void
}

/** Проект письма */
function InsuredPanel({ selectedContractorsIds, setSelectedContractorsIds }: InsuredPanelProps) {

  return (
    <div className="approval-details_panel">
      <Panel label="Застрахованные" isOpen={false}>
        <div className="approval-details_panel__content" style={{ padding: "0" }}>
          <InsuredList selectedContractorsIds={selectedContractorsIds} setSelectedContractorsIds={setSelectedContractorsIds} />
        </div>
      </Panel>
    </div>
  );
}

export default InsuredPanel;
