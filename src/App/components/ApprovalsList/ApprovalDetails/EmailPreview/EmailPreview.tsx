import React, { useEffect, useState } from "react";
import Panel from "../../../Panel/Panel";
import Button from "../../../Button/Button";
import { ButtonType, EmailPreviewData } from "../../../../shared/types";
import { copy } from "../../../../shared/utils/utils";
import FileViewer from "../../../InsuranceLetterModal/FileViewer/FileViewer";
class EmailPreviewProps {
  /** Данные проекта письма */
  emailPreviewData: EmailPreviewData
}

/** Проект письма */
function EmailPreview({ emailPreviewData }: EmailPreviewProps) {

  // Скопировать текст письма
  const onClickCopy = () => {
    if (emailPreviewData?.text) copy(emailPreviewData.text)
  }

  return (
    <div className="approval-details_panel">
      <Panel label="Макет письма" isOpen={false}>
        <div className="approval-details_panel__content">

          {/* Файл */}
          {emailPreviewData?.fileSrc &&
            <>
              <div className='approval-details_panel__viewer'>
                <FileViewer src={emailPreviewData?.fileSrc} isFileLoading={false} />
              </div>

              <div className='insurance-letter-modal__separator'></div>
            </>
          }
          <span>{emailPreviewData?.text}</span>
          <div>
            <Button title={"Скопировать"} clickHandler={onClickCopy} buttonType={ButtonType.outline}></Button></div>
        </div>
      </Panel>
    </div>
  );
}

export default EmailPreview;
