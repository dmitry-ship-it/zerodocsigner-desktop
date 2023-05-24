import React from "react";
import FormSetForInvisible from "./FormSetForInvisible";
import FormSetForVisible from "./FormSetForVisible";
import {
  officeFileExtensions,
  openFileExtensions,
  pdfFileExtension,
  reportSavedFile,
  reportWrongFileExtension,
  signAnyFile,
  signOfficeFile,
  signOpenFile,
  signPdfFile,
  validateAllSignatures,
} from "./helpers";
import logo from "../assets/vsu_logo.png";

export default function Form() {
  const [signatureType, setSignatureType] = React.useState("visible");
  const [fileExtension, setFileExtension] = React.useState("");
  const [isFileValid, setIsFileValid] = React.useState(true);
  const sendButtonRef = React.createRef<HTMLButtonElement>();
  const checkButtonRef = React.createRef<HTMLButtonElement>();

  const changeFileExtension = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const splitted = file.name.split(".");
    if (splitted.length < 2) {
      setFileExtension("");
      return;
    }
    setFileExtension(splitted[splitted.length - 1]);
  };

  const signFile = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const form = document.getElementById("main-form") as HTMLFormElement;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    e.preventDefault();
    const formData = new FormData(form, e.currentTarget);

    if (signatureType !== "visible") reportSavedFile(await signAnyFile(formData), sendButtonRef.current);
    else if (officeFileExtensions.includes(fileExtension.toLowerCase())) reportSavedFile(await signOfficeFile(formData), sendButtonRef.current);
    else if (openFileExtensions.includes(fileExtension.toLowerCase())) reportSavedFile(await signOpenFile(formData), sendButtonRef.current);
    else if (pdfFileExtension === fileExtension.toLowerCase()) reportSavedFile(await signPdfFile(formData), sendButtonRef.current);
    else reportWrongFileExtension(sendButtonRef.current);
  };

  const checkSignature = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (signatureType === "visible") return;
    const files = document.querySelector<HTMLInputElement>("#document")?.files;
    if (!files || files?.length === 0) {
      checkButtonRef.current?.setCustomValidity("Выберите файл");
      checkButtonRef.current?.reportValidity();
      return;
    }
    await validateAllSignatures(files[0]);
  };

  return (
    <form id="main-form">
      <img className="logo" src={logo} alt="vsu-logo" />
      <div className="grid-row">
        <label htmlFor="signature-type">Тип подписи</label>
        <select className="form-input" id="signature-type" name="signature-type" onChange={(e) => setSignatureType(e.target.value)}>
          <option value="visible">Стандартная</option>
          <option value="invisible">Универсальная</option>
        </select>
      </div>
      {signatureType !== "visible" ? <FormSetForInvisible /> : <FormSetForVisible fileExtension={fileExtension} setIsFileValid={setIsFileValid} />}
      <div className="grid-row">
        <input className="form-input document-input" type="file" id="document" name="document" onChange={changeFileExtension} required />
      </div>
      <div className="grid-row">
        <span className="text-green grid-col" id="file-status">
          {" "}
        </span>
      </div>
      <div className="grid-row">
        <button
          className="button-main"
          type="submit"
          id="send"
          ref={sendButtonRef}
          onClick={signFile}
          disabled={!isFileValid && signatureType === "visible"}>
          Подписать
        </button>
        <button className="button-check" type="submit" id="check" ref={checkButtonRef} onClick={checkSignature} hidden={signatureType === "visible"}>
          Проверить подпись
        </button>
      </div>
    </form>
  );
}
