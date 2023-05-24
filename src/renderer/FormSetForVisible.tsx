import React from "react";
import FormSetForOfficeDocument from "./FormSetForOfficeDocument";
import FormSetForOpenDocument from "./FormSetForOpenDocument";
import FormSetForPdfDocument from "./FormSetForPdfDocument";
import { officeFileExtensions, openFileExtensions, pdfFileExtension } from "./helpers";

export default function FormSetForVisible(ctx: { fileExtension: string; setIsFileValid: React.Dispatch<React.SetStateAction<boolean>> }) {
  if (officeFileExtensions.includes(ctx.fileExtension.toLowerCase())) {
    ctx.setIsFileValid(true);
    return <FormSetForOfficeDocument />;
  } else if (openFileExtensions.includes(ctx.fileExtension.toLowerCase())) {
    ctx.setIsFileValid(true);
    return <FormSetForOpenDocument />;
  } else if (pdfFileExtension === ctx.fileExtension.toLowerCase()) {
    ctx.setIsFileValid(true);
    return <FormSetForPdfDocument />;
  } else if (ctx.fileExtension !== "") {
    ctx.setIsFileValid(false);
    return <div className="grid-row text-alert">Этот формат файла не поддерживается данным типом подписи</div>;
  } else {
    ctx.setIsFileValid(false);
    return (
      <div className="grid-row">
        <strong>Выберите файл</strong>
      </div>
    );
  }
}
