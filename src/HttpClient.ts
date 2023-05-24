import { AnySignatureInfo, DocumentModel, OfficeSignatureInfo, OpenSignatureInfo, PdfSignatureInfo } from "./types";

export default class HttpClient {
  private static defaultRoute = "https://localhost:7008/";

  public static async signOfficeDocument(model: OfficeSignatureInfo) {
    return await this.post(model, "api/v2/sign/office");
  }

  public static async signOpenDocument(model: OpenSignatureInfo) {
    return await this.post(model, "api/v2/sign/open");
  }

  public static async signPdfDocument(model: PdfSignatureInfo) {
    return await this.post(model, "api/v2/sign/pdf");
  }

  public static async signAnyDocument(model: AnySignatureInfo) {
    return await this.post(model, "api/v2/sign/any");
  }

  public static async verify(model: DocumentModel) {
    return await this.post(model, "api/v2/verify");
  }

  private static async post<T>(model: T, route: string) {
    console.log(model);

    const response = await fetch(this.defaultRoute + route, {
      body: JSON.stringify(model),
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=utf-8",
      },
    });

    return await response.json();
  }
}
