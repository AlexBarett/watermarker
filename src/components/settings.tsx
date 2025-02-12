import { Form } from 'react-bootstrap';

export default function Settings({ inputPhotos, inputLabel }: {
  inputPhotos:  React.ChangeEventHandler<HTMLInputElement>,
  inputLabel:  React.ChangeEventHandler<HTMLInputElement>
}) {
  return (
    <>
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Загрузить логотип</Form.Label>
        <Form.Control type="file" onInput={inputLabel} />
      </Form.Group>
      <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Label>Загрузить изображения</Form.Label>
        <Form.Control type="file" multiple onChange={inputPhotos} />
      </Form.Group>
    </>
  )
}