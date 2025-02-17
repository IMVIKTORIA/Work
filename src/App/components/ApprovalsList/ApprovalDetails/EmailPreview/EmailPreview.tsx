import React, { useEffect, useState } from "react";
import Panel from "../../../Panel/Panel";
import Button from "../../../Button/Button";
import {
  ButtonType,
  EmailPreviewData,
  ApprovalFormType,
  ApprovalData,
} from "../../../../shared/types";
import { copy } from "../../../../shared/utils/utils";
import FileViewer from "../../../InsuranceLetterModal/FileViewer/FileViewer";

class EmailPreviewProps {
  /** Данные проекта письма */
  emailPreviewData: EmailPreviewData;
  values: ApprovalData;
}

/** Проект письма */
function EmailPreview({ emailPreviewData, values }: EmailPreviewProps) {
  // Скопировать текст письма
  const onClickCopy = () => {
    if (emailPreviewData?.text) copy(emailPreviewData.text);
  };

  return (
    <div className="approval-details_panel">
      <div className="approval-details_panel__content">
        {/* Файл */}
        {emailPreviewData?.fileSrc && (
          <>
            <div className="approval-details_panel__viewer">
              <FileViewer
                src={emailPreviewData?.fileSrc}
                isFileLoading={false}
              />
            </div>

            <div className="insurance-letter-modal__separator"></div>
          </>
        )}
        {values.forma && values.forma.data.code === ApprovalFormType.email && (
          <>
            <span>{emailPreviewData?.text}</span>
            <div>
              <Button
                title={"Скопировать"}
                clickHandler={onClickCopy}
                buttonType={ButtonType.outline}
              ></Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default EmailPreview;
