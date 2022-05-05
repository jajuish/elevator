export class Elevator {
	currentFloor: number;
	currentLoad: number;
	currentDirection: 0 | -1 | 1;
	nextDirection: 0 | -1 | 1;
	floorsQueue: Array<{ floor: number; direction?: 1 | -1 }>;

	constructor() {
		this.currentFloor = 0;
		this.currentLoad = 0;
		this.currentDirection = 0;
		this.nextDirection = 0;
		this.floorsQueue = [];
	}

	goToNextFloor(id: number) {
		if (this.floorsQueue.length != 0) {
			this.currentFloor = this.floorsQueue[0].floor
			console.log(`\nEle ${id} reached floor ${this.currentFloor}`)
			this.floorsQueue.shift()

			if (this.floorsQueue.length === 0) {
				this.currentDirection = 0
			} else {
				this.currentDirection = this.floorsQueue[0].direction !== undefined ?
					this.floorsQueue[0].direction :
					(this.floorsQueue[0].floor - this.currentFloor) < 0 ? -1 : 1
			}
			// console.log(`ele${id} queue: ${JSON.stringify(this.floorsQueue)}, dir: ${this.currentDirection}, fl: ${this.currentFloor}\n`)
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