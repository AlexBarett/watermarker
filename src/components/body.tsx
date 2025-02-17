import { useState } from 'react';
import Settings from './settings';
import InputForms from './inputForms';
import CarouselContainer from './carousel-container';
import { LabelStats, Photo } from '../interfaces';

export default function Body() {
  const [images, setImages] = useState<(Photo | undefined)[]>([]);
  const [label, setLabel] = useState<string | undefined>(undefined);
  const [settingsList, setSettingsList] = useState<LabelStats[]>([]);

  const inputPhotos: React.ChangeEventHandler<HTMLInputElement> = (input) => {
    const files = Array.from(input.target.files || []);
    console.warn("inputPhotos", files)

    setImages(new Array(files.length).fill(undefined));
    setSettingsList(new Array(files.length).fill(0).map(() => ({
      left: 0,
      top: 0,
      color: '#FF0000',
      opacity: 1,
      skip: false,
      isSvg: true,
      shift: [-1, -1, -1, -1]
    })));

    files.forEach((file, i) => {
      const fr = new FileReader();

      fr.onload = e => {
        console.warn("ONLOAD", i)
        setImages((imgs) => {
          const newImgs = [...imgs];

          newImgs[i] = {
            data: (e.target?.result || null),
            name: file.name
          };

          return newImgs
        });
      };

      fr.readAsDataURL(file);
    })
  };

  const inputLabel: React.ChangeEventHandler<HTMLInputElement> = (input) => {
    if (input.target.files) {
      const lbl = input.target.files[0];

      if (lbl) {
        const fr = new FileReader();

        fr.onload = (e => {
          setLabel(atob((e.target?.result as string || '').split(',')[1]));
        })

        fr.readAsDataURL(lbl);
      }
    }
  }

  // const isMobile = navigator.userAgent.toLocaleLowerCase().includes('ios') || navigator.userAgent.toLocaleLowerCase().includes('android');

  // const [photos, setPhotos] = useState<Photo[]>([]);
  // const [settingsList, setSettingsList] = useState<LabelStats[]>([])
  // // const [label, setLabel] = useState<string | ArrayBuffer | null>(null);

  // const inputPhotos: React.ChangeEventHandler<HTMLInputElement> = (input) => {
  //   Array.from(input.target.files || []).forEach(f => {
  //     const fr = new FileReader();

  //     fr.onload = e => {
  //       setPhotos((ph) => [...ph, {
  //         data: (e.target?.result || null),
  //         name: f.name
  //       }]);
  //       setSettingsList(set => ([...set, {
  //         left: 0,
  //         top: 0,
  //         color: '#FF0000',
  //         opacity: 1,
  //         skip: false,
  //         isSvg: f.name.split('.').pop()?.toLocaleLowerCase() === 'svg',
  //         shift: [-1, -1, -1, -1]
  //       }]));
  //     };

  //     fr.readAsDataURL(f);
  //   })
  // }

  // const inputLabel: React.ChangeEventHandler<HTMLInputElement> = (input) => {

  //   if (input.target.files) {
  //     const lbl = input.target.files[0];

  //     if (lbl) {
  //       const containers = document.querySelectorAll('.label-img');

  //       if (lbl.name.split('.').pop()?.toLocaleLowerCase() === 'svg') {
  //         containers.forEach(async c => {
  //           c.innerHTML = await input.target.files![0].text();
  //         });
  //       } else {
  //         containers.forEach(async c => {
  //           const img = new Image();
  //           img.src = URL.createObjectURL(input.target.files![0]);
  //           c.appendChild(img);
  //         });
  //       }
  //     }
  //   }
  // }

  // const onDragLabelEnd = (i: number) => () => {
  //   const backImg = document.querySelector('.active .background-img')! as HTMLImageElement;

  //   backImg.onpointermove = null;
    
  //   document.onmouseup = null;
  //   document.ontouchend = null;
  //   document.ontouchcancel = null;

  //   setSettingsList(set => {
  //     const newSet = [...set];
  //     newSet[i] = {
  //       ...newSet[i],
  //       shift: []
  //     };
  
  //     return newSet;
  //   });
  // };

  // const onDragLabelStart = (i: number) =>  () => {
  //   const backImg = document.querySelector('.active .background-img')! as HTMLImageElement;

  //   backImg.onpointermove = onMouseMove(i);
    
  //   document.onmouseup = onDragLabelEnd(i);
  //   document.ontouchcancel = onDragLabelEnd(i);
  //   document.ontouchend = onDragLabelEnd(i);
  // };

  // const onMouseMove = (i: number) => (moveEvent: TE<HTMLElement> | ME<HTMLElement> | TouchEvent | MouseEvent) => {
  //   moveEvent.preventDefault();
  //   moveEvent.stopPropagation();
    
  //   const label = document.querySelector('.active .label-img')! as HTMLElement;
  //   const settings = { ...settingsList[i] };

  //   if (!settings.shift.length) {
  //     settings.shift.push(0, 0);
  //     if (isMobile) {
  //       const mobileEvent = moveEvent as TE<HTMLImageElement>;
  
  //       settings.shift.push(mobileEvent.targetTouches[0].clientX);
  //       settings.shift.push(mobileEvent.targetTouches[0].clientY);
  //     } else {
  //       const webEvent = moveEvent as ME<HTMLImageElement>;
  
  //       settings.shift.push(webEvent.clientX);
  //       settings.shift.push(webEvent.clientY);
  //     }
  //   }

  //   if (isMobile) {
  //     const mobileEvent = moveEvent as TouchEvent;

  //     settings.shift[0] = settings.shift[3] - mobileEvent.targetTouches[0].clientX;
  //     settings.shift[1] = settings.shift[4] - mobileEvent.targetTouches[0].clientY;
  //     settings.shift[3] = mobileEvent.targetTouches[0].clientX;
  //     settings.shift[4] = mobileEvent.targetTouches[0].clientY;
  //   } else {
  //     const webEvent = moveEvent as MouseEvent;

  //     settings.shift[0] = settings.shift[3] - webEvent.clientX;
  //     settings.shift[1] = settings.shift[4] - webEvent.clientY;
  //     settings.shift[3] = webEvent.clientX;
  //     settings.shift[4] = webEvent.clientY;

  //   }

  //   settings.left = label.offsetLeft - settings.shift[0];
  //   settings.top = label.offsetTop - settings.shift[1];

  //   setSettingsList(set => {
  //     const newSet = [...set];
  //     newSet[i] = settings;
  
  //     return newSet;
  //   });
  // }

  // const onSaveButton = () => {
  //   const imagesHTML = document.querySelector('.active .background-img') as HTMLImageElement;
  //   const label = document.querySelector('.label-img svg')! as SVGSVGElement;
  //   // console.warn(label.he)
  //   const images: ImageMerger[] = photos.map((p, i) => {
  //     const settings = settingsList[i];
  //     // const imgTag = imagesHTML[i] as HTMLImageElement;

  //     return {
  //       background: p.data as string,
  //       // bgHeight: imgTag.height,
  //       bgHeight: imagesHTML.height,
  //       // bgWidth: imgTag.width,
  //       bgWidth: imagesHTML.width,
  //       opacity: settings.opacity,
  //       label: new XMLSerializer().serializeToString(label),
  //       left: settings.left,
  //       top: settings.top,
  //       size: label.height.baseVal.value,
  //       color: settings.color
  //     }
  //   });

  //   console.warn(images)

  //   imageMerger(images);

  //   results.forEach((res, i) => {
  //     const a = document.createElement('a');
  //     a.href = res;
  //     a.target = '_self';
  //     a.download = `test_${i}.png`;
  //     document.body.appendChild(a);
  //     a.click();
  //     document.body.removeChild(a);
  //   });
  // }
  
  // return (
  //   <div className="main-body">
  //     <Settings inputPhotos={inputPhotos} inputLabel={inputLabel} />
  //     <Carousel
  //       interval={null}
  //       touch={false}
  //     >
  //       {photos.map((photo, i) => {
  //         return <Carousel.Item key={photo.name}>
  //           <div>
  //             <img
  //               className="background-img"
  //               src={photo.data as string}
  //             >
  //             </img>
  //             <div
  //               style={{
  //                 top: `${settingsList[i].top}px`,
  //                 left: `${settingsList[i].left}px`,
  //                 fill: `${settingsList[i].color}`,
  //                 color: `${settingsList[i].color}`,
  //                 opacity: settingsList[i].opacity
  //               }}
  //               className="label-img"
  //               draggable={true}
  //               onMouseDown={onDragLabelStart(i)}
  //               onTouchMove={onMouseMove(i)}
  //             ></div>
  //           </div>
  //         </Carousel.Item>
  //       })}
  //     </Carousel>
  //     <Button
  //       className="mt-2"
  //       onClick={onSaveButton}
  //     >Сохранить</Button>
  //   </div>
  // )

  return (
    <>
      <div className="col-12 d-flex">
        <div className="col-6">
          <InputForms inputPhotos={inputPhotos} inputLabel={inputLabel}></InputForms>
        </div>
        <div className="col-6">
          <Settings></Settings>
        </div>
      </div>
      <CarouselContainer images={images} settingsList={settingsList} label={label!}></CarouselContainer>
    </>
  )
}