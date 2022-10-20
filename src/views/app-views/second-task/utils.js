import { 
  CHAIR_SIZE,
  FurnitureTypes, 
  TABLE_SIZE, 
  WALL_HEIGHT, 
  WALL_WIDTH,
} from "./constants";

export const getDimension = (type) => {
	if (type === FurnitureTypes.table) {
		return [TABLE_SIZE, TABLE_SIZE];
	} else if (type === FurnitureTypes.chair) {
		return [CHAIR_SIZE, CHAIR_SIZE];
	} else if (type === FurnitureTypes.wall) {
		return [WALL_WIDTH, WALL_HEIGHT];
	}
}


