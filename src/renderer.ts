// import "./index.css";
// import "./assets/vsu_logo.png";
// import { CommitmentType, OfficeSignatureInfo, SignModel } from "./types";
// import HttpClient from "./HttpClient";

// const isValidFilesExtension = (files: FileList, acceptedFileExtensions: string[]) => {
//   for (const file of files) {
//     const splitted = file.name.split(".");
//     if (splitted.length < 2 || !acceptedFileExtensions.includes(splitted[splitted.length - 1].toLowerCase())) {
//       return false;
//     }
//   }

//   return true;
// };

// const reportWrongFileExtension = () => {
//   const button = document.querySelector<HTMLButtonElement>("#send");
//   button.setCustomValidity("Данный формат файла не поддерживается");
//   button.reportValidity();
// };

// const toBase64 = (file: File) =>
//   new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
//   });

// const saveBase64File = (content: string, oldFile: File) => {
//   const splitted = oldFile.name.split(".");
//   const fileName = [...splitted]
//     .slice(0, splitted.length - 2)
//     .concat(splitted[splitted.length - 2] + "_signed." + splitted[splitted.length - 1])
//     .join(".");
//   const newPath = oldFile.path.replace(oldFile.name, fileName);
//   (window as any).electron.ipcRenderer.sendMessage("save_file", [newPath, content]);

//   return newPath;
// };

// const handleBasicFileSigning = async () => {
//   const form: HTMLFormElement = document.querySelector("#main-form");
//   const files = form.querySelector<HTMLInputElement>("#file").files;

//   if (files.length === 0) return;

//   const model: SignModel = {
//     data: "",
//     force: form.querySelector<HTMLInputElement>("#force").checked,
//     signerInfo: {
//       signer: form.querySelector<HTMLInputElement>("#signer").value,
//     },
//   };

//   const acceptedFileExtensions = ["doc", "xls", "ppt", "docx", "xlsx", "pptx", "pdf"];
//   if (!isValidFilesExtension(files, acceptedFileExtensions)) reportWrongFileExtension();

//   let savedPath: string;
//   for (const file of files) {
//     model.data = ((await toBase64(file)) as string).split(",")[1];
//     const content = await HttpClient.sign(model);
//     savedPath = saveBase64File(content, file);
//   }

//   const button = document.querySelector<HTMLButtonElement>("#send");
//   if (files.length === 1) {
//     button.setCustomValidity(`Файл сохранен (${savedPath}).`);
//   } else {
//     button.setCustomValidity("Файлы подписаны и сохранены.");
//   }

//   button.reportValidity();
// };

// const handleAdvancedFileSigning = async () => {
//   const form: HTMLFormElement = document.querySelector("#main-form");
//   const files = form.querySelector<HTMLInputElement>("#file").files;

//   let commitmentTypeValue: string;
//   switch (form.querySelector<HTMLInputElement>("#commitment-type").value as CommitmentType) {
//     case "created":
//       commitmentTypeValue = "Создал данный документ";
//       break;
//     case "approved":
//       commitmentTypeValue = "Утвердил данный документ";
//       break;
//     case "created-approved":
//       commitmentTypeValue = "Создал и утвердил данный документ";
//       break;
//   }

//   const model: OfficeSignatureInfo = {
//     commitmentType: commitmentTypeValue,
//     addressPrimary: form.querySelector<HTMLInputElement>("#address-primary").value,
//     addressSecondary: form.querySelector<HTMLInputElement>("#address-secondary").value,
//     city: form.querySelector<HTMLInputElement>("#city").value,
//     stateOrProvince: form.querySelector<HTMLInputElement>("#state-or-province").value,
//     postalCode: form.querySelector<HTMLInputElement>("#postal-code").value,
//     countryName: form.querySelector<HTMLInputElement>("#country-name").value,
//     signerRole: form.querySelector<HTMLInputElement>("#signer-role").value,
//     signatureComments: form.querySelector<HTMLInputElement>("#signature-comments").value,
//     document: "",
//   };

//   const acceptedFileExtensions = ["docx", "pptx", "xlsx"];
//   if (!isValidFilesExtension(files, acceptedFileExtensions)) reportWrongFileExtension();

//   let savedPath: string;
//   for (const file of files) {
//     model.document = ((await toBase64(file)) as string).split(",")[1];
//     const content = await HttpClient.signAdvanced(model);
//     savedPath = saveBase64File(content, file);
//   }

//   const button = document.querySelector<HTMLButtonElement>("#send");
//   if (files.length === 1) {
//     button.setCustomValidity(`Файл сохранен (${savedPath}).`);
//   } else {
//     button.setCustomValidity("Файлы подписаны и сохранены.");
//   }

//   button.reportValidity();
//   form.reset();
// };

// document.querySelector<HTMLFormElement>("#main-form").addEventListener("submit", async (e) => {
//   // prevent default refresh functionality of forms
//   e.preventDefault();

//   const basicSignatureFieldSet = document.querySelector<HTMLFieldSetElement>("#basic-signature");

//   if (basicSignatureFieldSet.disabled) {
//     await handleAdvancedFileSigning();
//   } else {
//     await handleBasicFileSigning();
//   }
// });

// document.querySelector<HTMLSelectElement>("#signature-type").addEventListener("change", (e) => {
//   e.preventDefault();

//   const basicSignatureFieldSet = document.querySelector<HTMLFieldSetElement>("#basic-signature");
//   const advancedSignatureFieldSet = document.querySelector<HTMLFieldSetElement>("#advanced-signature");
//   const checkSignatureButton = document.querySelector<HTMLButtonElement>("#check");

//   const selectElement = e.target as HTMLSelectElement;
//   switch (selectElement.value) {
//     case "visible":
//       checkSignatureButton.hidden = true;
//       basicSignatureFieldSet.hidden = true;
//       basicSignatureFieldSet.disabled = true;
//       advancedSignatureFieldSet.hidden = false;
//       advancedSignatureFieldSet.disabled = false;
//       break;
//     case "invisible":
//       checkSignatureButton.hidden = false;
//       basicSignatureFieldSet.hidden = false;
//       basicSignatureFieldSet.disabled = false;
//       advancedSignatureFieldSet.hidden = true;
//       advancedSignatureFieldSet.disabled = true;
//       break;
//   }
// });

// document.querySelector<HTMLButtonElement>("#advanced-signature-more-button").addEventListener("click", (e) => {
//   e.preventDefault();

//   const moreGroup = document.querySelector<HTMLDivElement>("#advanced-signature-more");
//   moreGroup.hidden = !moreGroup.hidden;

//   const button = e.target as HTMLButtonElement;
//   if (moreGroup.hidden) {
//     button.textContent = "Больше...";
//   } else {
//     button.textContent = "Меньше...";
//   }
// });

// document.querySelector<HTMLButtonElement>("#check").addEventListener("click", async (e) => {
//   e.preventDefault();

//   const fileElement = document.querySelector<HTMLInputElement>("#file");
//   if (fileElement.files.length === 0) return;

//   fileElement.disabled = true;

//   const file = fileElement.files[0];
//   const status = document.querySelector("#file-status");
//   const data = ((await toBase64(file)) as string).split(",")[1];
//   const isFileValid = (await HttpClient.verify({ data: data })) === "true";

//   status.innerHTML = isFileValid
//     ? '<span class="text-good" id="file-status">(Цифровая подпись верифицирована)</span>'
//     : '<span class="text-alert" id="file-status">(Цифровая подпись не найдена или недействительна)</span>';

//   fileElement.disabled = false;
// });

// document.querySelector<HTMLFormElement>("#main-form").addEventListener("click", () => {
//   const status = document.querySelector("#file-status");
//   status.innerHTML = '<span class="text-green grid-col" id="file-status"> </span>';
// });
import "./renderer/index";
