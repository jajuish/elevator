export class Elevator {
	currentFloor: number;
	currentLoad: number;
	currentDirection: 0 | -1 | 1;
	floorsQueue: Array<number>;

	constructor() {
		this.currentFloor = 0;
		this.currentLoad = 0;
		this.currentDirection = 0;
		this.floorsQueue = [];
	}

	goToNextFloor() {
		this.currentFloor = this.floorsQueue[0]
		this.floorsQueue.shift()
	}
}

export interface Floor {
	id: number;
	upPressed: boolean;
	downPressed: boolean;
}