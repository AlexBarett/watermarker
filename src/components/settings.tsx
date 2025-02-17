import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { SIZES } from '../helpers';

export default function Settings(
//   { inputPhotos, inputLabel }: {
//   inputPhotos:  React.ChangeEventHandler<HTMLInputElement>,
//   inputLabel:  React.ChangeEventHandler<HTMLInputElement>
// }
) {
  const [opacity, setOpacity] = useState(1);
  const [color, setColor] = useState('#FF0000');

  return (
    <>
      <Form.Group className="d-flex">
        <Form.Label className="text-nowrap position-relative pe-5">Прозрачность: <div className="position-absolute top-0 end-0">{opacity}</div></Form.Label>
        <Form.Range className="me-4 ms-3" min={0} max={1} step={0.05} defaultValue={1} onChange={({target}) => setOpacity(+target.value)}></Form.Range>
      </Form.Group>
      <Form.Group className="d-flex">
        <Form.Label className="text-nowrap position-relative pe-5">Основной цвет: </Form.Label>
        <Form.Control type="Color" defaultValue={color} onChange={({target}) => setColor(target.value)}></Form.Control>
      </Form.Group>
      <Form.Select aria-placeholder="test">
        <option key={0} disabled>Размер лейбла</option>
        {SIZES.map(size => {
          const mul = 1;
          return (
            <option key={size[0]} value={JSON.stringify([size[0], size[1] * mul])}>{size[0]} X {size[1] * mul}</option>
          )
        })}
      </Form.Select>
      
      {/* <Form.Group controlId="formFile" className="mb-3">
        <Form.Label>Загрузить логотип</Form.Label>
        <Form.Control type="file" onInput={inputLabel} />
      </Form.Group>
      <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Label>Загрузить изображения</Form.Label>
        <Form.Control type="file" multiple onChange={inputPhotos} />
      </Form.Group> */}
    </>
  )
}
