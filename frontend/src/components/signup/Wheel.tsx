import React, { useRef, useEffect, useState } from 'react';
import { TrackDetails, useKeenSlider } from 'keen-slider/react';

export default function Wheel(props: {
  initIdx?: number;
  tag: string;
  label?: string;
  length: number;
  loop?: boolean;
  idx: number;
  perspective?: 'left' | 'right' | 'center';
  width: number;
  setValue?: (relative: number, absolute: number) => string;
  onChange?: (tmp: number) => number;
}) {
  const perspective = props.perspective || 'center';
  const wheelSize = 14;
  const slides = props.length;
  const slideDegree = 360 / wheelSize;
  const slidesPerView = props.loop ? 9 : 1;
  const [sliderState, setSliderState] = React.useState<TrackDetails | null>(null);
  const size = useRef(0);
  const [options, setOptions] = useState({
    slides: {
      number: slides,
      origin: props.loop ? 'center' : 'auto',
      perView: slidesPerView,
    },
    vertical: true,
    initial: props.initIdx || 0,
    loop: props.loop,
    dragSpeed: val => {
      const height = size.current;
      return val * (height / ((height / 2) * Math.tan(slideDegree * (Math.PI / 180))) / slidesPerView);
    },
    created: s => {
      size.current = s.size;
    },
    updated: s => {
      size.current = s.size;
    },
    /* 스크롤 될때 마다 이벤트 발생 */
    detailsChanged: s => {
      if (s.track.details.abs < props.idx || s.track.details.abs > props.length) return;
      setSliderState(s.track.details);
      props.onChange(s.track.details.abs);
    },
    rubberband: !props.loop,
    mode: 'free-snap',
  });

  useEffect(() => {
    setOptions(prevOptions => ({
      ...prevOptions,
      slides: {
        ...prevOptions.slides,
        number: props.length,
      },
    }));
  }, [props.length]);

  const [sliderRef, slider] = useKeenSlider(options);

  const [radius, setRadius] = useState(0);

  useEffect(() => {
    if (slider.current) setRadius(slider.current.size / 2);
  }, [slider]);

  function slideValues() {
    if (!sliderState || !sliderState.slides) return [];

    const offset = props.loop ? 1 / 2 - 1 / slidesPerView / 2 : 0;
    const slidesDetails = sliderState.slides;

    const values = [];
    for (let i = props.idx; i < slides; i++) {
      const slideDetail = slidesDetails[i];
      if (!slideDetail) continue;

      const distance = (slideDetail.distance - offset) * slidesPerView;
      const rotate = Math.abs(distance) > wheelSize / 2 ? 180 : distance * (360 / wheelSize) * -1;
      const style = {
        transform: `rotateX(${rotate}deg) translateZ(${radius}px)`,
        WebkitTransform: `rotateX(${rotate}deg) translateZ(${radius}px)`,
      };
      const value = props.setValue ? props.setValue(i, sliderState.abs + Math.round(distance)) : i;
      values.push({ style, value });
    }
    return values;
  }

  return (
    <div className={'wheel keen-slider wheel--perspective-' + perspective} ref={sliderRef}>
      <div
        className="wheel__shadow-top"
        style={{
          transform: `translateZ(${radius}px)`,
          WebkitTransform: `translateZ(${radius}px)`,
        }}
      />
      <div className="wheel__inner">
        <div className="wheel__slides" style={{ width: props.width + 'px' }}>
          {slideValues().map(({ style, value }, idx) => (
            <div className="wheel__slide text-2xl" style={style} key={idx}>
              <span>{value + 1}</span>
              <span>{props.tag}</span>
            </div>
          ))}
        </div>
        {props.label && (
          <div
            className="wheel__label"
            style={{
              transform: `translateZ(${radius}px)`,
              WebkitTransform: `translateZ(${radius}px)`,
            }}
          >
            {props.label}
          </div>
        )}
      </div>
      <div
        className="wheel__shadow-bottom"
        style={{
          transform: `translateZ(${radius}px)`,
          WebkitTransform: `translateZ(${radius}px)`,
        }}
      />
    </div>
  );
}
