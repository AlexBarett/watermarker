import { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { GeneralStats } from '../interfaces';

export interface SettingsProps {
  current: number;
  saveImages: (index?: number) => void;
  delImages: () => void;
  changeSettings: (settings: Partial<GeneralStats>, forAll?: boolean) => void;
  settings?: GeneralStats;
}

export default function Settings(props: SettingsProps) {
  const [aar, setAar] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [opacity, setOpacity] = useState(props.settings?.opacity);
  const [name, setName] = useState('');
  const [placeholder, setPlaceholder] = useState(props.settings?.name);
  const [bgSize, setBgSize] = useState([0, 0])

  useEffect(() => {
    setOpacity(props.settings?.opacity);
    setPlaceholder(props.settings?.name);
  }, [props.settings]);

  const saveChanges = (forAll: boolean) => {
    setShowModal(false);

    const changes: Partial<GeneralStats> = { opacity };

    if (name) {
      changes.name = name;
    }

    if (bgSize[0]) {
      changes.bgWidth = bgSize[0];
    }

    if (bgSize[1]) {
      changes.bgHeight = bgSize[1];
    }

    props.changeSettings(changes, forAll);
  };

  const setSize = (w?: number, h?: number) => {
    console.log(props, {w, h})
    if (w === undefined) {
      
      if (aar) {
        setBgSize([Math.round(h! / props.settings!.ratio), h!]);
      } else {
        setBgSize(size => [size[0], h!]);
      }

      return;
    }

    if (h === undefined) {

      if (aar) {
        setBgSize([w, Math.round(w * props.settings!.ratio)]);
      } else {
        setBgSize(size => [w, size[1]]);
      }

      return;
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between m-2 mb-3">
      <Button
        disabled={!props.settings}
        className="me-2"
        variant="outline-primary"
        onClick={() => setShowModal(true)}
      >
        Дополнительно
      </Button>
      <Button
        disabled={!props.settings}
        className="ms-2"
        variant="outline-primary"
      >
        Сбросить лейбл
      </Button>
      </div>
      <div className="m-2 d-flex justify-content-between">
          <Button
            disabled={!props.settings}
            variant="outline-danger"
            onClick={() => props.delImages()}
          >
            Удалить
          </Button>
        <Button
          disabled={!props.settings}
          variant="outline-primary"
          onClick={() => props.saveImages(props.current)}
        >
          Сохранить
        </Button>
        <Button
          disabled={!props.settings}
          variant="outline-primary"
          onClick={() => props.saveImages()}>Сохранить все
        </Button>
      </div>



      <Modal show={showModal}>
        <Modal.Header>
          <Modal.Title>Настройки лейбла</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
          </Form.Group>
          <Form.Group className="d-flex flex-column">
            <Form.Label className="text-nowrap position-relative pe-5 mb-0">
              Прозрачность: <div className="position-absolute top-0 end-0">{opacity}</div>
            </Form.Label>
            <Form.Range
              className="p-3"
              min={0}
              max={1}
              step={0.05}
              defaultValue={props.settings?.opacity}
              onChange={(e) => setOpacity(+e.target.value)}
            ></Form.Range>
          </Form.Group>
          <Form.Group className="d-flex flex-column">
            <Form.Label className="text-nowrap position-relative pe-5 mb-0" htmlFor="name">
              Название: <br />
              <p className="mb-0">
                <small className="text-secondary ms-2">
                  (при применении для всех будет добавлена нумерация вида: "_1")
                </small>
              </p>
            </Form.Label>
            <Form.Control
              className="mt-2"
              type="text"
              id="name"
              placeholder={placeholder}
              onFocus={(e) => {
                if (!e.target.value) {
                  e.target.value = placeholder!
                }
              }}
              onChange={({ target }) => setName(target.value)}
            >
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>Размеры готового изображения: </Form.Label>
            <div className="d-flex">
              <Form.Control
                className="me-2"
                style={{ width: '80px' }}
                value={bgSize[0] || props.settings?.bgWidth}
                onChange={(e) => setSize(+e.target.value)}
              >    
              </Form.Control>
              <div className="d-flex justify-content-center align-items-center">X</div>
              <Form.Control
                className="ms-2"
                style={{ width: '80px' }}
                value={bgSize[1] || props.settings?.bgHeight}
                onChange={(e) => setSize(undefined, +e.target.value)}
              >
              </Form.Control>
              <Form.Check
                type="switch"
                className="d-flex align-items-center mx-3"
                checked={aar}
                onChange={() => setAar(!aar)}
                label={<div className="mx-2">Соотношения</div>}>
              </Form.Check>
            </div>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary me-auto" onClick={() => setShowModal(false)}>Отмена</Button>
          <Button variant="outline-primary" onClick={() => saveChanges(true)}>Применить для всех</Button>
          <Button variant="outline-primary" onClick={() => saveChanges(false)}>Применить</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
