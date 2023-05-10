import { DataModel, OfficeSignatureInfo, SignModel } from "./types";

export default class HttpClient {
  private static defaultRoute = "https://localhost:7008/";

  public static async sign(model: SignModel) {
    return await this.post(model, "sign");
  }

  public static async signAdvanced(model: OfficeSignatureInfo) {
    return await this.post(model, "api/v2/sign");
  }

  public static async verify(model: DataModel) {
    return await this.post(model, "verify");
  }

  private static async post(model: object, route: string) {
    const response = await fetch(this.defaultRoute + route, {
      body: JSON.stringify(model),
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=utf-8",
      },
    });

    return await response.text();
  }
}
