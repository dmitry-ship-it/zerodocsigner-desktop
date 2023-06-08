import HttpClient from "../HttpClient";
import { AnyDocumentVerifyResult, AnySignatureInfo, DocumentModel, OfficeSignatureInfo, OpenSignatureInfo, PdfSignatureInfo } from "../types";

export const commitmentTypes = new Map<string, string>([
  ["created-approved", "Создал и утвердил данный документ"],
  ["created", "Создал данный документ"],
  ["approved", "Утвердил данный документ"],
]);

export const officeFileExtensions = ["docx", "xlsx", "pptx"];
export const openFileExtensions = ["odt", "ods", "odp"];
export const pdfFileExtension = "pdf";

const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const signOfficeFile = async (formData: FormData) => {
  const file = formData.get("document") as File;
  const model: OfficeSignatureInfo = {
    addressPrimary: formData.get("addressPrimary") as string,
    addressSecondary: formData.get("addressSecondary") as string,
    city: formData.get("city") as string,
    commitmentType: commitmentTypes.get(formData.get("commitmentType") as string) as string,
    countryName: formData.get("countryName") as string,
    postalCode: formData.get("postalCode") as string,
    signatureComments: formData.get("signatureComments") as string,
    signerRole: formData.get("signerRole") as string,
    stateOrProvince: formData.get("stateOrProvince") as string,
    document: ((await toBase64(formData.get("document") as File)) as string).split(",")[1],
  };

  const result = (await HttpClient.signOfficeDocument(model)) as DocumentModel;

  return saveBase64File(result.document, file);
};

export const signOpenFile = async (formData: FormData) => {
  const file = formData.get("document") as File;
  const model: OpenSignatureInfo = {
    city: formData.get("city") as string,
    commitmentType: commitmentTypes.get(formData.get("commitmentType") as string) as string,
    countryName: formData.get("countryName") as string,
    postalCode: formData.get("postalCode") as string,
    signatureComments: formData.get("signatureComments") as string,
    signerRole: formData.get("signerRole") as string,
    stateOrProvince: formData.get("stateOrProvince") as string,
    document: ((await toBase64(file)) as string).split(",")[1],
  };

  const result = (await HttpClient.signOpenDocument(model)) as DocumentModel;

  return saveBase64File(result.document, file);
};

export const signPdfFile = async (formData: FormData) => {
  const file = formData.get("document") as File;
  const model: PdfSignatureInfo = {
    approve: commitmentTypes.get(formData.get("approve") as string) === commitmentTypes.get("approved"),
    contact: formData.get("contact") as string,
    location: formData.get("location") as string,
    reason: formData.get("reason") as string,
    signerRole: formData.get("signerRole") as string,
    document: ((await toBase64(file)) as string).split(",")[1],
  };

  const result = (await HttpClient.signPdfDocument(model)) as DocumentModel;

  return saveBase64File(result.document, file);
};

export const signAnyFile = async (formData: FormData) => {
  const file = formData.get("document") as File;
  const model: AnySignatureInfo = {
    addressPrimary: formData.get("addressPrimary") as string,
    addressSecondary: formData.get("addressSecondary") as string,
    city: formData.get("city") as string,
    commitmentType: commitmentTypes.get(formData.get("commitmentType") as string) as string,
    countryName: formData.get("countryName") as string,
    postalCode: formData.get("postalCode") as string,
    signatureComments: formData.get("signatureComments") as string,
    signerRole: formData.get("signerRole") as string,
    stateOrProvince: formData.get("stateOrProvince") as string,
    force: (formData.get("force") as string | null) !== null,
    document: ((await toBase64(file)) as string).split(",")[1],
  };

  const result = (await HttpClient.signAnyDocument(model)) as DocumentModel;

  return saveBase64File(result.document, file);
};

const saveBase64File = (content: string, oldFile: File) => {
  const splitted = oldFile.name.split(".");
  const fileName = [...splitted]
    .slice(0, splitted.length - 2)
    .concat(splitted[splitted.length - 2] + "_signed." + splitted[splitted.length - 1])
    .join(".");
  const newPath = oldFile.path.replace(oldFile.name, fileName);
  (window as any).electron.ipcRenderer.sendMessage("save_file", [newPath, content]);

  return newPath;
};

export const reportSavedFile = (filePath: string, button: HTMLButtonElement | null) => {
  if (button === null) return;
  button.setCustomValidity(`Файл сохранен (${filePath}).`);
  button.reportValidity();
};

export const reportWrongFileExtension = (button: HTMLButtonElement | null) => {
  if (button === null) return;
  button.setCustomValidity("Данный формат файла не поддерживается");
  button.reportValidity();
};

export const validateAllSignatures = async (file: File) => {
  const result = (await HttpClient.verify({
    document: ((await toBase64(file)) as string).split(",")[1],
  })) as AnyDocumentVerifyResult[];

  if (result.length === 0) {
    (window as any).electron.ipcRenderer.sendMessage("show_message", ["Подписи не найдены."]);
    return;
  }

  let message = "";
  for (const item of result) {
    message += item.isValid ? "====== Подпись действительна ======\n" : "====== !! Подпись недействительна ======\n";
    message += "Тип подтверждения: " + item.commitmentType + "\n";
    message += "Цель подписания: " + item.signatureComments + "\n";
    message += "Роль или должность: " + item.signerRole + "\n";
    message += "Адрес: " + item.addressPrimary + "\n";
    message += "Адрес (2): " + item.addressSecondary + "\n";
    message += "Город: " + item.city + "\n";
    message += "Область или край: " + item.stateOrProvince + "\n";
    message += "Почтовый индекс: " + item.postalCode + "\n";
    message += "Страна: " + item.countryName + "\n\n";
  }

  (window as any).electron.ipcRenderer.sendMessage("show_message", [message.substring(0, message.length - 2)]);
};

export class RequestError extends Error {
  constructor(message: string, public statusCode: number) {
    super(message);
  }
}
