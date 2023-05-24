import React from "react";

export default function FormSetForPdfDocument() {
  const [moreBlockVisible, setMoreBlockVisible] = React.useState(true);

  return (
    <fieldset className="grid grid-row" id="basic-signature">
      <legend className="grid-row">Видимая подпись</legend>
      <div className="grid-row input-row">
        <label htmlFor="approve">Тип подтверждения: </label>
        <select className="form-input" id="approve" name="approve" required>
          <option value="created">Создал данный документ</option>
          <option value="approved">Утвердил данный документ</option>
        </select>
      </div>
      <div className="grid-row input-row">
        <label htmlFor="reason">Цель подписания: </label>
        <input className="form-input" type="text" name="reason" id="reason" required />
      </div>
      <div className="grid-row input-row">
        <label htmlFor="signer-role">Роль или должность: </label>
        <input className="form-input" type="text" name="signerRole" id="signer-role" required />
      </div>
      <div id="advanced-signature-more" hidden={moreBlockVisible}>
        <div className="grid-row input-row">
          <label htmlFor="location">Адрес подписания: </label>
          <input className="form-input" type="text" name="location" id="location" value="210038, г. Витебск, Московский проспект, 33" required />
        </div>
        <div className="grid-row input-row">
          <label htmlFor="contact">Контактная информация: </label>
          <input className="form-input" type="text" name="contact" id="contact" value="info@mail-vsu.by" required />
        </div>
      </div>
      <button className="more-button" id="advanced-signature-more-button" type="button" onClick={() => setMoreBlockVisible(!moreBlockVisible)}>
        {moreBlockVisible ? "Больше..." : "Меньше..."}
      </button>
    </fieldset>
  );
}
