import { useState, useRef } from 'react';
import utils from 'utils';
import { calculateCoordinates, getDimension } from './utils';
import { 
	FILE_NAME,
	FURNITURE,
	FurnitureTypes,
	HEIGHT_LIMIT,
	MAX_RANGE, 
	MIN_RANGE,
	TIMER,
	WIDTH_LIMIT,
} from './constants';
import InteractiveImage from './interactive-img';
import { Fragment } from 'react';


const SecondTask = () => {
	const [objectsInModel, setObjectsInModel] = useState([]);
	const [downloadLink, setDownloadLink] = useState('');
	const [isUrlSet, setIsUrlSet] = useState(false);

	const containerRef = useRef(null);
	const fileInputRef = useRef(null);
	
	const calculableCoordinates = useRef({
		startCoordinateX: 0,
		startCoordinateY: 0,
		maxHeigh: 0,
	});

	const handleSubmit = (evt) => {
		evt.preventDefault();

		let formData = new FormData(evt.target);
		const item = formData.get(FURNITURE);
		const width = getDimension(item)[0];
		const height = getDimension(item)[1];

		const [coordinateStartX, coordinateStartY] = calculateCoordinates(calculableCoordinates, width, height);
		
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

	const handleGetLink = () => {
		const myBlob = new Blob([JSON.stringify(objectsInModel)], {type: 'application/json'});
		const url = URL.createObjectURL(myBlob);

		setDownloadLink(url);
		setIsUrlSet(true)
	}

	const handleUrlClick = () => {
		const removeData = () => {
			setIsUrlSet(false);
			window.URL.revokeObjectURL(downloadLink);
			setDownloadLink('')
		};

		setTimeout(removeData, TIMER);
	}

	const handleFileChange = () => {
		const file = fileInputRef.current.files[0];
		const reader = new FileReader();

		reader.readAsText(file);

		reader.onload = () => setObjectsInModel(JSON.parse(reader.result));
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
			<div className="custom-test__first">
				<form onSubmit={handleSubmit} className="custom-test">
					<fieldset className="custom-test__fieldset">
						<legend className="custom-test">Construct your room</legend>
						{
							Object.values(FurnitureTypes).map((line, index) => (
								<Fragment key={utils.getRandomPositiveInteger(MIN_RANGE, MAX_RANGE)}>
									<input 
										className="custom-test__radio" 
										type="radio" id={line.value} 
										name="furniture" 
										value={line.value} 
										defaultChecked={(index === 0 ? true : false)} 
									/>
									<label className="custom-test__label" htmlFor={line.value}>
										<img 
											className="custom-test__label-img" 
											src={`/img/pictures/${line.value}.png`} 
											width="50" 
											height="50" 
											alt="" 
										/>
										{line.title}
									</label>
								</Fragment>
							))
						}	
					</fieldset>
					
					<button className="custom-test__button custom-test__button--simple" type="submit">Add to model environment</button>
					<button className="custom-test__button" type="button" onClick={handleGetLink}>Get link for download</button>
					<input className="custom-test__visually-hidden" type="file" id="file-input" onChange={handleFileChange} ref={fileInputRef} />
					<label className="custom-test__button custom-test__button--upload" htmlFor="file-input">Upload File</label>
					{
						isUrlSet
						?
							<a className="custom-test__button custom-test__button--download" 
								href={downloadLink} 
								download={FILE_NAME} 
								onMouseUp={handleUrlClick}
							>
								Download file
							</a>
						:
							''
					}
				</form>
			</div>
			
			<div className="custom-test__second" style={{width: `${WIDTH_LIMIT}px`, height: `${HEIGHT_LIMIT}px` }} ref={containerRef}>
				{
					objectsInModel.length > 0
					?
						objectsInModel.map((line) => (
							 <InteractiveImage 
								style={{left: line.coordinates.startX, top: line.coordinates.startY}}
								type={line.type}
								width={line.width} 
								height={line.height} 
								key={line.id}
								updateCoordinates={updateCoordinates(line.id)}
								containerRef={containerRef}
							/>
						))
					:
						<p className="custom-test__paragraph">No models in environment</p>
				}
			</div>
		</div>
	)
}

export default SecondTask
