import { Elevator, Floor } from "./types";

const isBetween = (n: number, a: number, b: number) => (n - a) * (n - b) <= 0

export default class BuildingSystem {
	elevators: Array<Elevator>;
	floors: number;
	maxCap: number;
	// requestsQueue: Array<{ floor: number; direction: 1 | -1; }>;

	constructor(numElevators: number, floors: number, maxCap: number) {
		this.elevators = Array(numElevators).fill(new Elevator())
		this.floors = floors;
		this.maxCap = maxCap;

		// TODO: set timer to start elevators working
	}

	// polls which elevator to send
	call(floor: number, direction: 1 | -1) {
		console.log(`\nCalled at floor ${floor} direction ${direction}`)
		if (floor < 0 || floor > 200) {
			// TODO: raise error
		}

		// TODO: add check if floor is already pressed

		// assign a score to each elevator
		const eleScores = Array(this.elevators.length).fill(0)
		this.elevators.forEach((elevator: Elevator, index: number) => {
			// if the elevator is idle, use this one
			if (elevator.currentDirection == 0) {
				eleScores[index] += 100
				return // TODO: test if it actually returns
			}

			// if the elevator is already full, cannot send this one now
			if (elevator.currentLoad >= this.maxCap) {
				eleScores[index] -= 100;
				return // TODO: test if it actually returns
			}

			// if the pressed floor is on the way of this elevator
			// and the direction is the same with this drop then can choose this one
			const nextFloor = elevator.floorsQueue[0]
			if (isBetween(floor, elevator.currentFloor, nextFloor) && direction == elevator.currentDirection) {
				eleScores[index] += 10
			}
		})

		console.log("eleScores==",eleScores)

		// pick the elevator with the highest score
		const elePicked = eleScores.indexOf(Math.max(...eleScores))
		console.log(`Sending elevator ${elePicked+1}`)

		// add the floor to its queue
		this.addFloorToQueue(this.elevators[elePicked], floor)
	}

	addFloorToQueue(ele: Elevator, floor: number): void {
		// if it is between any of the floors already in the queue, then add there
		// else add at the end
		let indexToAdd = ele.floorsQueue.length
		for (let i = 0; i < ele.floorsQueue.length - 1; i++) {
			if (isBetween(floor, ele.floorsQueue[i], ele.floorsQueue[i+1])) {
				indexToAdd = i+1
			}
		}
		ele.floorsQueue = [...ele.floorsQueue.slice(0, indexToAdd), floor, ...ele.floorsQueue.slice(indexToAdd)]
		console.log(`New queue ${ele.floorsQueue}`)
	}

	boardPeople(ele: Elevator, numPeople: number, destinationFloor: number): boolean {
		const newTotal = ele.currentLoad + (numPeople * 60);
		if (newTotal > this.maxCap) {
			return false;
		}
		ele.currentLoad = newTotal;
		this.addFloorToQueue(ele, destinationFloor)
		return true;
	}

}