import { writeFileSync } from "fs";
import { DataModel, SignModel } from "./types";

class HttpClient {

    private static defaultRoute: string = 'https://localhost:7008/'
    public static async sign(model: SignModel) {
        return await this.post(model, "sign")
    }

    public static async verify(model: DataModel) {
        return await this.post(model, "verify")
    }

    private static async post(model: any, route: string) {
        const response = await fetch(this.defaultRoute + route, {
            body:JSON.stringify(model),
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=utf-8"
            }
        });

        return await response.text();
    }
}

const toBase64 = (file: File) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

document.querySelector('#main-form').addEventListener('submit', async (e) => {
    // prevent default refresh functionality of forms
    e.preventDefault()

    const form: HTMLFormElement = document.querySelector('#main-form');
    const file: File = form.querySelector<HTMLInputElement>('#file').files[0];

    const model: SignModel = {
        data: ((await toBase64(file)) as string).split(',')[1],
        force: form.querySelector<HTMLInputElement>('#force').checked,
        signerInfo: {
            signer: form.querySelector<HTMLInputElement>("#signer").value
        }
    }

    const content = await HttpClient.sign(model);
    const fileName = file.name.replace(".", "_signed.");
    const newPath = file.path.replace(file.name, fileName);
    
    const button = document.querySelector<HTMLButtonElement>("#send");
    if (content.indexOf('.') !== -1)
    {
        button.setCustomValidity("При попытке создания подписи возникла ошибка.");
    } else {
        button.setCustomValidity(`Файл сохранен (${newPath}).`);
    }
    
    button.reportValidity();
    writeFileSync(newPath, content, { encoding:"base64" });
});

let isFileValid: boolean;
document.querySelector<HTMLInputElement>('#file').addEventListener('change', async (e) => {
    e.preventDefault();

    console.log("change");

    const fileElement = document.querySelector<HTMLInputElement>("#file");
    fileElement.disabled = true;
    const file = fileElement.files[0];
    const status = document.querySelector("#file-status");

    const data = ((await toBase64(file)) as string).split(',')[1];
    console.log(data);

    isFileValid = await HttpClient.verify({data: data}) === "true";

    console.log(isFileValid);

    status.innerHTML = isFileValid
        // TODO: Add signer to message and to API model.
        ? "<span class=\"text-good\">(Цифровая подпись верифицирована)</span>"
        : "<span class=\"text-alert\">(Цифровая подпись не найдена или недействительна)</span>";

    fileElement.disabled = false;
});
