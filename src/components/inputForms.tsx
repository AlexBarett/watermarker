import { createRef } from "react"

export default function InputForms({inputPhotos, inputLabel}: {
  inputPhotos: React.ChangeEventHandler<HTMLInputElement>,
  inputLabel: React.ChangeEventHandler<HTMLInputElement>
}) {
  const labelInput = createRef<HTMLInputElement>();
  const imgInput = createRef<HTMLInputElement>();

  return (
    <div className="d-flex justify-content-between">
      <input ref={labelInput} className="d-none" type="file" accept=".svg" onChange={inputLabel}></input>
      <input ref={imgInput} className="d-none" type="file" multiple accept="image/*" onChange={inputPhotos}></input>
      <div className="m-2 mb-3">
        <button type="button" className="btn btn-outline-primary" onClick={() => imgInput.current?.click()}>Загрузить фото</button>
      </div>
      <div className="m-2 mb-3">
        <button type="button" className="btn btn-outline-primary" onClick={() => labelInput.current?.click()}>Выбрать лейбл</button>
      </div>
    </div>
  )
}