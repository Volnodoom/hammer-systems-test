import { useState } from "react";
import { useEffect } from "react";
import { memo } from "react";
import { useRef } from "react"
import { HEIGHT_LIMIT, WIDTH_LIMIT, ZERO_PX } from "./constants";
import { getImgHalfOffsetHeight, getImgHalfOffsetWidth, getRelativeCoordinateX, getRelativeCoordinateY } from "./utils";

const InteractiveImage = ({type, width, height, containerRef, style, updateCoordinates }) => {
  const imgRef = useRef(null);
  const [containerStartX, setContainerStartX] = useState(null);
  const [containerStartY, setContainerStartY] = useState(null);
  const [scrollTop, setScrollTop] = useState();

  useEffect(() => {
    const onScroll = (evt) => {
      setScrollTop(evt.target.documentElement.scrollTop);
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);
  

  useEffect(() => {
    setContainerStartX(containerRef.current.getBoundingClientRect().left); 
    setContainerStartY(containerRef.current.getBoundingClientRect().top);
  }, [containerRef, scrollTop])

  const moveIt = (evt) => {
    imgRef.current.style.left = `${getRelativeCoordinateX(evt, containerStartX) - getImgHalfOffsetWidth(imgRef)}px`;
    imgRef.current.style.top = `${getRelativeCoordinateY(evt, containerStartY) - getImgHalfOffsetHeight(imgRef)}px`;
  }

  const dropIt = (evt) => {
    const imgHalfOffsetWidth = getImgHalfOffsetWidth(imgRef);
    const imgHalfOffsetHeight = getImgHalfOffsetHeight(imgRef);

    const generalStringCoordinateX = `${getRelativeCoordinateX(evt, containerStartX) - imgHalfOffsetWidth}px`;
    const generalStringCoordinateY = `${getRelativeCoordinateY(evt, containerStartY) - imgHalfOffsetHeight}px`;

    const maxElementPositionX = WIDTH_LIMIT  - imgRef.current.offsetWidth;
    const maxElementPositionY = HEIGHT_LIMIT - imgRef.current.offsetHeight;
    
    const setElementPosition = (valueStringLeft, valueStringTop) => {
      imgRef.current.style.left = valueStringLeft;
      imgRef.current.style.top = valueStringTop;
    }

    const isMinBorderX = getRelativeCoordinateX(evt, containerStartX) < imgHalfOffsetWidth;
    const isMinBorderY = getRelativeCoordinateY(evt, containerStartY) < imgHalfOffsetHeight ;
    const isMaxBorderX = getRelativeCoordinateX(evt, containerStartX) > WIDTH_LIMIT - imgHalfOffsetWidth ;
    const isMaxBorderY = getRelativeCoordinateY(evt, containerStartY) > HEIGHT_LIMIT - imgHalfOffsetHeight ;

    //set extreme conditions
    isMinBorderX && setElementPosition(ZERO_PX, generalStringCoordinateY) && updateCoordinates({startX: 0});
    isMinBorderY && setElementPosition(generalStringCoordinateX, ZERO_PX) && updateCoordinates({startY: 0});
    isMaxBorderX && setElementPosition(`${maxElementPositionX}px`, generalStringCoordinateY) && updateCoordinates({startX: maxElementPositionX});
    isMaxBorderY && setElementPosition(generalStringCoordinateX, `${maxElementPositionY}px`) && updateCoordinates({startY: maxElementPositionY});
    
    isMinBorderX && isMinBorderY && setElementPosition(ZERO_PX, ZERO_PX) 
    && updateCoordinates({startX: 0, startY: 0});
    
    isMinBorderX && isMaxBorderY && setElementPosition(ZERO_PX, `${maxElementPositionY}px`) 
    && updateCoordinates({startX: 0, startY: maxElementPositionY});
    
    isMaxBorderX && isMinBorderY && setElementPosition(`${maxElementPositionX}px`, ZERO_PX) 
    && updateCoordinates({startX: maxElementPositionX, startY: 0});
    
    isMaxBorderX && isMaxBorderY && setElementPosition(`${maxElementPositionX}px`, `${maxElementPositionY}px`) 
    && updateCoordinates({startX: maxElementPositionX, startY: maxElementPositionY});

    // when object does not touch the borders
    !isMinBorderX && !isMinBorderY && !isMaxBorderX && !isMaxBorderY 
    && updateCoordinates({
      startX: generalStringCoordinateX,
      startY: generalStringCoordinateY,
    })
  }

  const handleDragStart = (evt) => {
    moveIt(evt);
  }

  const handleDragEnd = (evt) => {
    evt.target.style.outline = 'transparent';
    dropIt(evt);
  }

  const handleDrag = (evt) => {
    evt.preventDefault();
    evt.target.style.outline = '3px solid tomato';

    moveIt(evt);
  }

  return(
    <>
      <img style={{...style, position: 'absolute'}}
        src={`/img/pictures/${type}.png`} 
        width={width} 
        height={height} 
        alt={type} 
        draggable="true"
        ref={imgRef}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDrag={handleDrag}
      />
    </>
  )
}

export default memo(InteractiveImage)
