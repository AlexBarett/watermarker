import { Carousel, Spinner } from "react-bootstrap";
import { LabelStats, LabelTypes, Photo } from "../interfaces";
import Label from './label';

export default function CarouselContainer({images, settingsList, label}: {
  images: (Photo | undefined)[],
  settingsList: LabelStats[],
  label: string;
}) {
  return (
    <>
      <Carousel className="h-100 overflow-hidden"
        interval={null}
        touch={false}
      >
        {images.map((img, i) => {
          if (!img) {
            return (
              <Carousel.Item className="h-100 overflow-hidden" key={i}>
                <Spinner animation="border" variant="primary" />
              </Carousel.Item>
            )
          }
          console.warn(settingsList)
          return <Carousel.Item className="h-100 overflow-hidden" key={i}>
            <div className="h-100 d-flex justify-content-center bg-dark-subtle">
              <div className="position-relative">
                <img
                  className="background-img object-fit-contain w-100 h-100"
                  src={img.data as string}
                >
                </img>
                {
                  (() => {
                    if (settingsList[i]) {
                      return <div className="position-absolute"
                          style={{
                            top: `${settingsList[i].top}px`,
                            left: `${settingsList[i].left}px`,
                            fill: `${settingsList[i].color}`,
                            color: `${settingsList[i].color}`,
                            opacity: settingsList[i].opacity
                          }}
                          >
                          <Label settings={settingsList[i]} label={label}></Label>
                        </div>
                    }

                    return (<></>)
                  })()
                }
              </div>
              {/* <div
                style={{
                  top: `${settingsList[i].top}px`,
                  left: `${settingsList[i].left}px`,
                  fill: `${settingsList[i].color}`,
                  color: `${settingsList[i].color}`,
                  opacity: settingsList[i].opacity
                }}
                className="label-img"
                draggable={true}
                // onMouseDown={onDragLabelStart(i)}
                // onTouchMove={onMouseMove(i)}
              ></div> */}
            </div>
          </Carousel.Item>
        })}
      </Carousel>
    </>
  )
}