import { 
  CHAIR_SIZE,
  FurnitureTypes, 
  TABLE_SIZE, 
  WALL_HEIGHT, 
  WALL_WIDTH,
  WIDTH_LIMIT,
} from "./constants";

export const getDimension = (type) => {
	if (type === FurnitureTypes.table.value) {
		return [TABLE_SIZE, TABLE_SIZE];
	} else if (type === FurnitureTypes.chair.value) {
		return [CHAIR_SIZE, CHAIR_SIZE];
	} else if (type === FurnitureTypes.wall.value) {
		return [WALL_WIDTH, WALL_HEIGHT];
	}
}

export const calculateCoordinates = (ref, oneWidth, oneHeight) => {
  let coordinateX = ref.current.startCoordinateX;

  ref.current.startCoordinateX += Number(oneWidth);
  
  if(ref.current.maxHeigh < Number(oneHeight)) {
    ref.current.maxHeigh = Number(oneHeight);
  }
  
  if(ref.current.startCoordinateX > Number(WIDTH_LIMIT)) {
    ref.current.startCoordinateX = Number(oneWidth);
    coordinateX = 0;
    ref.current.startCoordinateY += ref.current.maxHeigh;
    ref.current.maxHeigh = 0;
  }
  return [coordinateX, ref.current.startCoordinateY];
}
