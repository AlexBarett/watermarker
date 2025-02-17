import { Carousel, Spinner } from "react-bootstrap";
import { LabelStats, Photo } from "../interfaces";

export default function CarouselContainer({images, settingsList}: {
  images: (Photo | undefined)[],
  settingsList: LabelStats[]
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

          return <Carousel.Item className="h-100 overflow-hidden" key={i}>
            <div className="h-100 d-flex justify-content-center">
              <img
                className="background-img h-100"
                src={img.data as string}
              >
              </img>
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