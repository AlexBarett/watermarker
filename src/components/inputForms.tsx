import { createRef } from "react"

export default function InputForms({inputPhotos}: {
  inputPhotos: React.ChangeEventHandler<HTMLInputElement>
}) {
  const labelInput = createRef<HTMLInputElement>();
  const imglInput = createRef<HTMLInputElement>();

  return (
    <>
      <input ref={labelInput} className="d-none" type="file" accept=".svg"></input>
      <input ref={imglInput} className="d-none" type="file" multiple accept="image/*" onChange={inputPhotos}></input>
      <div className="m-2 mb-3">
        <button type="button" className="btn btn-outline-primary" onClick={() => labelInput.current?.click()}>Выбрать лейбл</button>
      </div>
      <div className="m-2 mb-3">
        <button type="button" className="btn btn-outline-primary" onClick={() => imglInput.current?.click()}>Загрузить фото</button>
      </div>
    </>
  )
}