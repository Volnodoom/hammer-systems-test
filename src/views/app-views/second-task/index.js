import React from 'react'
import { useState } from 'react'
import utils from 'utils';
import { getDimension } from './utils';
import { 
	FURNITURE,
	HEIGHT_LIMIT,
	MAX_RANGE, 
	MIN_RANGE,
	WIDTH_LIMIT,
} from './constants';
import InteractiveImage from './interactive-img';
import { useRef } from 'react';

const SecondTask = () => {
	const [objectsInModel, setObjectsInModel] = useState([]);
	const containerRef = useRef(null);
	const calculableCoordinates = useRef({
		startCoordinateX: 0,
		startCoordinateY: 0,
		maxHeigh: 0,
	});

	const calculateCoordinates = (oneWidth, oneHeight) => {
		let coordinateX = calculableCoordinates.current.startCoordinateX;

		calculableCoordinates.current.startCoordinateX += Number(oneWidth);
		
		if(calculableCoordinates.current.maxHeigh < Number(oneHeight)) {
			calculableCoordinates.current.maxHeigh = Number(oneHeight);
		}
		
		if(calculableCoordinates.current.startCoordinateX > Number(WIDTH_LIMIT)) {
			calculableCoordinates.current.startCoordinateX = Number(oneWidth);
			coordinateX = 0;
			calculableCoordinates.current.startCoordinateY += calculableCoordinates.current.maxHeigh;
			calculableCoordinates.current.maxHeigh = 0;
		}
		return [coordinateX, calculableCoordinates.current.startCoordinateY];
	}

	const handleSubmit = (evt) => {
		evt.preventDefault();

		let formData = new FormData(evt.target);
		const item = formData.get(FURNITURE);
		const width = getDimension(item)[0];
		const height = getDimension(item)[1];

		const [coordinateStartX, coordinateStartY] = calculateCoordinates(width, height);
		
		setObjectsInModel((prev) => (
			[
				...prev,
				{
					id: `${item}-${utils.getRandomPositiveInteger(MIN_RANGE, MAX_RANGE)}`,
					type: item,
					width,
					height,
					coordinates: {
						startX: coordinateStartX,
						startY: coordinateStartY,
					}
				}
			]
		))
	}

	const updateCoordinates = (id) => (coordinates) => {
		setObjectsInModel((prev) =>  {
			const data = [...prev];
			const index = data.findIndex((line) => line.id === id);

			data[index].coordinates = {
				...data[index].coordinates,
				...coordinates,
			};

			return data.slice();
		})
	} 

	return (
		<div>
			<div>
				<form onSubmit={handleSubmit}>
					<fieldset>
						<legend>Please, choose elements of furniture to model your room</legend>
						<input type='radio' id='table' name='furniture' value='table' defaultChecked/>
						<label htmlFor='table'>
							<img src='/img/pictures/table.png' width='50' height='50' alt='Round table' />
							Table
						</label>

						<input type='radio' id='chair' name='furniture' value='chair'/>
						<label htmlFor='chair'>
							<img src='/img/pictures/chair.png' width='50' height='50' alt='Oval chair' />
							Chair
						</label>

						<input type='radio' id='wall' name='furniture' value='wall'/>
						<label htmlFor='wall'>
							<img src='/img/pictures/wall.png' width='50' height='50' alt='Long brown wall' />
							Wall
						</label>
					</fieldset>
					<button type='submit'>Add to model environment</button>
				</form>
			</div>
			<div style={{width: `${WIDTH_LIMIT}px`, height: `${HEIGHT_LIMIT}px`, position: 'relative'}} ref={containerRef}>
				{
					objectsInModel.length > 0
					?
						objectsInModel.map((line) => {
							
							return <InteractiveImage 
								style={{left: line.coordinates.startX, top: line.coordinates.startY}}
								type={line.type}
								width={line.width} 
								height={line.height} 
								key={line.id}
								updateCoordinates={updateCoordinates(line.id)}
								containerRef={containerRef}
							/>
						})
					:
						''
				}
			</div>
		</div>
	)
}

export default SecondTask
