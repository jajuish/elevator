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
		if (this.floorsQueue.length != 0) {
			this.currentFloor = this.floorsQueue[0]
			console.log(`Going to floor ${this.currentFloor}`)
			this.floorsQueue.shift()
			this.currentDirection = (this.floorsQueue[0] - this.currentFloor) < 0 ? -1 : 1
		} else {
			this.currentDirection = 0
		}
	}
}

export interface Floor {
	id: number;
	upPressed: boolean;
	downPressed: boolean;
}