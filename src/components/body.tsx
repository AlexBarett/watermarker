import { useState } from 'react';
import Settings from './settings';
import InputForms from './inputForms';
import CarouselContainer from './carousel-container';
import { GeneralStats, Size } from '../interfaces';
import { imageMerger } from '../helpers';

const BASE_SIZE = 1280;

export default function Body() {
  const [images, setImages] = useState<(string | null)[]>([]);
  const [label, setLabel] = useState<string | undefined>(undefined);
  const [settingsList, setSettingsList] = useState<GeneralStats[]>([]);
  const [current, setCurrent] = useState(0);

  const inputPhotos: React.ChangeEventHandler<HTMLInputElement> = (input) => {
    const files = Array.from(input.target.files || []);

    if (!files.length) {
      setSettingsList([]);
      return;
    }

    setImages(new Array(files.length).fill(null));
    setSettingsList(new Array(files.length).fill(0).map((_, i) => ({
      left: 100,
      top: 100,
      opacity: 0.8,
      isSvg: true,
      labelHeight: 48,
      labelWidth: 48,
      bgHeight: 0,
      bgWidth: 0,
      ratio: 0,
      labelRatio: 0,
      name: (() => {
        const nameParts = files[i].name.split('.');
        nameParts.pop();
        return nameParts.join('');
      })()
    })));

    files.forEach((file, i) => {
      const fr = new FileReader();

      fr.onload = e => {
        setImages((imgs) => {
          const newImgs = [...imgs];

          const image = new Image();
          image.src = e.target?.result as string;
          image.onload = () => {
            if (image.naturalHeight > image.naturalWidth) {
              const ratio = image.naturalHeight / image.naturalWidth;
              updateSettings({
                bgHeight: BASE_SIZE,
                bgWidth: Math.round(BASE_SIZE / ratio),
                ratio: ratio,
              });
            } else {
              const ratio = image.naturalWidth / image.naturalHeight;
              updateSettings({
                bgHeight: Math.round(BASE_SIZE / ratio),
                bgWidth: BASE_SIZE,
                ratio: ratio,
              });
            }
          };

          newImgs[i] = ((e.target?.result as string) || null);

          return newImgs;
        });
      };

      fr.readAsDataURL(file);
    })
  };

  const inputLabel: React.ChangeEventHandler<HTMLInputElement> = (input) => {
    if (input.target.files) {
      const lbl = input.target.files[0];
      
      if (lbl) {
        const isSvg =  input.target.files[0].name.split('.').pop() === 'svg';
        const fr = new FileReader();

        fr.onload = (e => {
          const img = new Image();
          img.src = e.target?.result as string;
          img.onload = () => {
            setSettingsList(l => l.map(l => ({ ...l, isSvg, labelRatio: img.naturalHeight / img.naturalWidth })));
          };

          setLabel(atob((e.target?.result as string || '').split(',')[1]));
        })

        fr.readAsDataURL(lbl);
      }
    }
  }

  const changeSizeSettings = (i: number) => (ch: Size) => {
    setSettingsList(sl => {
      const nsl = [...sl];
      const skipT = (nsl[i].labelHeight + ch.dh) < 24;
      const skipL = (nsl[i].labelWidth + ch.dw) < 24;

      nsl[i] = {
        ...nsl[i],
        labelHeight: Math.max(nsl[i].labelHeight + ch.dh, 24),
        labelWidth: Math.max(nsl[i].labelWidth + ch.dw, 24),
        top: skipT ? nsl[i].top : Math.max(nsl[i].top + ch.dt, -(nsl[i].labelHeight * 0.25)),
        left: skipL ? nsl[i].left : Math.max(nsl[i].left + ch.dl, -(nsl[i].labelWidth * 0.25)),
      };

      return nsl;
    });
  }

  const updateSettings = (settings: Partial<GeneralStats>, forAll?: boolean) => {
    setSettingsList(sl => {
      const nsl = [...sl];

      if (forAll) {
        return nsl.map((n, i) => ({
          ...n,
          ...settings,
          name: settings.name ? `${settings.name}_${i + 1}` : n.name
        }));
      }

      nsl[current] = {
        ...nsl[current],
        ...settings
      };

      return nsl;
    });
  }

  const delImage = () => {
    setImages(img => img.reduce((acc, el, i) => {
      if (i === current) {
        return acc;
      }
      acc.push(el);
      return acc;
    }, [] as (string | null)[]));
    setSettingsList(l => l.reduce((acc, el, i) => {
      if (i === current) {
        return acc;
      }
      acc.push(el);
      return acc;
    }, [] as GeneralStats[]));
  }

  const saveImages = (index?: number) => {
    const i = index ?? -1;
    const selectedImages = (i < 0) ? images : [images[i]]
    const img = document.querySelector('.active.carousel-item .background-img') as HTMLImageElement;
    const src = img.src;
    imageMerger(selectedImages.map((image, i) => {
      const settings = settingsList[i];
      img.src = image!;

      return {
        background: image || '',
        bgWidth: settings.bgWidth,
        bgHeight: settings.bgHeight,
      
        label: label || '',
        lWidth: settings.labelWidth,
        lHeight: settings.labelHeight,
      
        opacity: settings.opacity,
        top: settings.top,
        left: settings.left,
      
        displayedWidth: img.width,
        displayedHeight: img.height,
        name: settings.name
      };
    }));
    img.src = src;
  }

  return (
    <>
      <div className="col-12 d-flex flex-wrap">
        <div className="col-12 col-lg-6">
          <InputForms inputPhotos={inputPhotos} inputLabel={inputLabel}></InputForms>
        </div>
        <div className="col-12 col-lg-6">
          <Settings
            delImages={delImage}
            current={current}
            saveImages={saveImages} 
            settings={settingsList[current]}
            changeSettings={updateSettings}
          >
          </Settings>
        </div>
      </div>
      {settingsList[current]?.name}
      <CarouselContainer
        images={images}
        settingsList={settingsList}
        label={label!}
        changeSettings={changeSizeSettings}
        setCurrent={setCurrent}>
        </CarouselContainer>
    </>
  )
}