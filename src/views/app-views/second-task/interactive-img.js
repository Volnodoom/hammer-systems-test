import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react"
import { HEIGHT_LIMIT, WIDTH_LIMIT, ZERO_PX } from "./constants";

const InteractiveImage = ({type, width, height, containerRef, style, updateCoordinates }) => {
  const imgRef = useRef(null);
  const [containerStartX, setContainerStartX] = useState(null);
  const [containerStartY, setContainerStartY] = useState(null);

  useEffect(() => {
    setContainerStartX(containerRef.current.getBoundingClientRect().left); 
    setContainerStartY(containerRef.current.getBoundingClientRect().top);
  }, [containerRef])

  const moveIt = (evt) => {
    imgRef.current.style.left = `${evt.pageX - containerStartX  - imgRef.current.offsetWidth/2}px`;
    imgRef.current.style.top = `${evt.pageY - containerStartY - imgRef.current.offsetHeight/2}px`;
  }

  const dropIt = (evt) => {
    const imgOffsetWidth = imgRef.current.offsetWidth/2;
    const imgOffsetHeight = imgRef.current.offsetHeight/2;

    const maxElementPositionX = WIDTH_LIMIT  - imgRef.current.offsetWidth;
    const maxElementPositionY = HEIGHT_LIMIT - imgRef.current.offsetHeight;
    
    const setElementLeft = (valueString) => imgRef.current.style.left = valueString;
    const setElementTop = (valueString) => imgRef.current.style.top = valueString;

    const isMinBorderX = evt.pageX - containerStartX < imgOffsetWidth;
    const isMinBorderY = evt.pageY - containerStartY < imgOffsetHeight ;
    const isMaxBorderX = evt.pageX - containerStartX > WIDTH_LIMIT - imgOffsetWidth ;
    const isMaxBorderY = evt.pageY - containerStartY > HEIGHT_LIMIT - imgOffsetHeight ;
    
    isMinBorderX && setElementLeft(ZERO_PX) && updateCoordinates({startX: 0});
    isMinBorderY && setElementTop(ZERO_PX) && updateCoordinates({startY: 0});
    isMaxBorderX && setElementLeft(`${maxElementPositionX}px`) && updateCoordinates({startX: maxElementPositionX});
    isMaxBorderY && setElementTop(`${maxElementPositionY}px`) && updateCoordinates({startY: maxElementPositionY});
    
    !isMinBorderX && !isMinBorderY && !isMaxBorderX && !isMaxBorderY 
    && updateCoordinates({
      startX: evt.pageX - containerStartX  - imgOffsetWidth,
      startY: evt.pageY - containerStartY - imgOffsetHeight,
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

export default InteractiveImage
