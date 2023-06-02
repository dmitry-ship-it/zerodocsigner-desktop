import { RequestError } from "./renderer/helpers";
import { AnySignatureInfo, DocumentModel, Jwt, LoginModel, OfficeSignatureInfo, OpenSignatureInfo, PdfSignatureInfo } from "./types";

export default class HttpClient {
  private static defaultRoute = "https://localhost:7008/";
  private static jwt: Jwt | null;

  public static async signOfficeDocument(model: OfficeSignatureInfo) {
    return await this.post(model, "api/sign/office");
  }

  public static async signOpenDocument(model: OpenSignatureInfo) {
    return await this.post(model, "api/sign/open");
  }

  public static async signPdfDocument(model: PdfSignatureInfo) {
    return await this.post(model, "api/sign/pdf");
  }

  public static async signAnyDocument(model: AnySignatureInfo) {
    return await this.post(model, "api/sign/any");
  }

  public static async verify(model: DocumentModel) {
    return await this.post(model, "api/verify");
  }

  public static async login(model: LoginModel) {
    const jwt = (await this.post(model, "api/auth")) as Jwt;
    if (jwt?.value === null) return false;
    this.jwt = jwt;
    return true;
  }

  private static async post<T>(model: T, route: string) {
    const response = await fetch(this.defaultRoute + route, {
      body: JSON.stringify(model),
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=utf-8",
        Authorization: "Bearer " + this.jwt?.value,
      },
    });

    if (response.status === 401) throw new RequestError("Вы не авторизованы в системе", response.status);
    if (response.status === 400) throw new RequestError("Вы не можете подписывать электронные документы", response.status);
    if (!response.ok) throw new RequestError("Ошибка при подписании документа", response.status);

    return await response.json();
  }
}
