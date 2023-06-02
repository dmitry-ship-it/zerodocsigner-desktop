import React from "react";

export default function FormSetForInvisible() {
  const [moreBlockVisible, setMoreBlockVisible] = React.useState(true);

  return (
    <fieldset className="grid grid-row" id="basic-signature">
      <legend className="grid-row">Видимая подпись</legend>
      <div className="grid-row input-row">
        <label htmlFor="commitment-type">Тип подтверждения: </label>
        <select className="form-input" id="commitment-type" name="commitmentType" required>
          <option value="created-approved">Создал и утвердил данный документ</option>
          <option value="approved">Утвердил данный документ</option>
          <option value="created">Создал данный документ</option>
        </select>
      </div>
      <div className="grid-row input-row">
        <label htmlFor="signature-comments">Цель подписания: </label>
        <input className="form-input" type="text" name="signatureComments" id="signature-comments" required />
      </div>
      <div className="grid-row input-row">
        <label htmlFor="signer-role">Роль или должность: </label>
        <input className="form-input" type="text" name="signerRole" id="signer-role" required />
      </div>
      <div id="advanced-signature-more" hidden={moreBlockVisible}>
        <div className="grid-row input-row">
          <label htmlFor="address-primary">Адрес: </label>
          <input className="form-input" type="text" name="addressPrimary" id="address-primary" value="Московский проспект" required />
        </div>
        <div className="grid-row input-row">
          <label htmlFor="address-secondary">Адрес (2): </label>
          <input className="form-input" type="text" name="addressSecondary" id="address-secondary" value="33" required />
        </div>
        <div className="grid-row input-row">
          <label htmlFor="city">Город: </label>
          <input className="form-input" type="text" name="city" id="city" value="Витебск" required />
        </div>
        <div className="grid-row input-row">
          <label htmlFor="state-or-province">Область или край: </label>
          <input className="form-input" type="text" name="stateOrProvince" id="state-or-province" value="Витебская область" required />
        </div>
        <div className="grid-row input-row">
          <label htmlFor="postal-code">Почтовый индекс: </label>
          <input className="form-input" type="text" name="postalCode" id="postal-code" value="210038" required />
        </div>
        <div className="grid-row input-row">
          <label htmlFor="country-name">Страна или регион: </label>
          <input className="form-input" type="text" name="countryName" id="country-name" value="Республика Беларусь" required />
        </div>
      </div>
      <div className="grid-row" id="force-block">
        <label htmlFor="force">Переподписать</label>
        <input className="form-input" type="checkbox" id="force" name="force" value="checked" />
      </div>
      <button className="more-button" id="advanced-signature-more-button" type="button" onClick={() => setMoreBlockVisible(!moreBlockVisible)}>
        {moreBlockVisible ? "Больше..." : "Меньше..."}
      </button>
    </fieldset>
  );
}
