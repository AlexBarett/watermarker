import { Carousel, Spinner } from "react-bootstrap";
import { GeneralStats, Size } from "../interfaces";
import PcLabel from './pc-label';
import { IS_MOBILE } from "../helpers";
import TouchLabel from "./touch-label";

export default function CarouselContainer(props: {
  images: (string | null)[],
  settingsList: GeneralStats[],
  label: string;
  setCurrent: (i: number) => void;
  changeSettings: (index: number) => (ch: Size) => void
}) {

  const changeSizes = (change: (ch: Size) => void) => (ch: Size) => change(ch);

  return (
    <>
      <Carousel className="h-100 overflow-hidden"
        interval={null}
        touch={false}
        onSelect={(i) => props.setCurrent(i)}
      >
        {props.images.map((img, i) => {
          if (!img) {
            return (
              <Carousel.Item
                className="h-100 w-100 overflow-hidden d-flex justify-content-center align-items-center"
                key={i}
              >
                <Spinner animation="border" variant="primary" />
              </Carousel.Item>
            )
          }
          return <Carousel.Item
            className="h-100 w-100 overflow-hidden"
            key={i}
          >
            <div className="h-100 d-flex justify-content-center align-items-center bg-dark-subtle">
              <div className="position-relative overflow-hidden mh-100 mw-100">
                {/* <Form.Text className="m-1">{props.settingsList[i].name}</Form.Text> */}
                <img
                  className="background-img position-relative object-fit-contain mh-100 mw-100 user-select-none"
                  src={img as string}
                >
                </img>
                {
                  (() => {
                    if (props.settingsList[i]) {
                      return <div className="position-absolute"
                          style={{
                            top: `${props.settingsList[i].top}px`,
                            left: `${props.settingsList[i].left}px`
                          }}
                          >
                          {(() => {
                            const label = IS_MOBILE ? TouchLabel : PcLabel;
                            return label({
                              settings: props.settingsList[i],
                              label: props.label,
                              changeSizes: changeSizes(props.changeSettings(i)),
                            })
                          })()}
                        </div>
                    }
                    return null
                  })()
                }
              </div>
            </div>
          </Carousel.Item>
        })}
      </Carousel>
    </>
  )
}