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
    const imgHalfOffsetWidth = imgRef.current.offsetWidth/2;
    const imgHalfOffsetHeight = imgRef.current.offsetHeight/2;

    const generalStringCoordinateX = `${evt.pageX - containerStartX  - imgHalfOffsetWidth}px`;
    const generalStringCoordinateY = `${evt.pageY - containerStartY - imgHalfOffsetHeight}px`;

    const maxElementPositionX = WIDTH_LIMIT  - imgRef.current.offsetWidth;
    const maxElementPositionY = HEIGHT_LIMIT - imgRef.current.offsetHeight;
    
    const setElementPosition = (valueStringLeft, valueStringTop) => {
      imgRef.current.style.left = valueStringLeft;
      imgRef.current.style.top = valueStringTop;
    }

    const isMinBorderX = evt.pageX - containerStartX < imgHalfOffsetWidth;
    const isMinBorderY = evt.pageY - containerStartY < imgHalfOffsetHeight ;
    const isMaxBorderX = evt.pageX - containerStartX > WIDTH_LIMIT - imgHalfOffsetWidth ;
    const isMaxBorderY = evt.pageY - containerStartY > HEIGHT_LIMIT - imgHalfOffsetHeight ;
    
    isMinBorderX && setElementPosition(ZERO_PX, generalStringCoordinateY) && updateCoordinates({startX: 0});
    isMinBorderY && setElementPosition(generalStringCoordinateX, ZERO_PX) && updateCoordinates({startY: 0});
    isMaxBorderX && setElementPosition(`${maxElementPositionX}px`, generalStringCoordinateY) && updateCoordinates({startX: maxElementPositionX});
    isMaxBorderY && setElementPosition(generalStringCoordinateX, `${maxElementPositionY}px`) && updateCoordinates({startY: maxElementPositionY});
    
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

export default InteractiveImage
