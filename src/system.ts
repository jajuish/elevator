/*
Requirements
Number of floors: 200
Number of elevators in a building: 2
Max passenger-carrying capacity: 400kg
Need to be secure and operational.
*/

import { Elevator, Floor } from "./types";

const isBetween = (n: number, a: number, b: number) => (n - a) * (n - b) <= 0

export default class BuildingSystem {
	eleOne: Elevator;
	eleTwo: Elevator;
	maxCap: number;

	constructor(timed: boolean) {
		this.eleOne = new Elevator();
		this.eleTwo = new Elevator();
		this.maxCap = 400;

		if (timed) {
			setInterval(() => {
				this.eleOne.goToNextFloor(1)
				this.eleTwo.goToNextFloor(2)
			}, 2000)
		} else {
			setInterval(() => {
				this.eleOne.goToNextFloor(1)
				this.eleTwo.goToNextFloor(2)
			}, 0)
		}
	}

	/**
	 * polls which elevator to send 
   */ 
	call(floor: number, direction: 1 | -1): { ele: 1 | 2; posInQueue: number; } {
		console.log(`\nCalled at floor ${floor} direction ${direction}`)
		if (floor < 0 || floor > 200) {
			// TODO: raise error
		}

		// TODO: check if floor is already pressed

		// TODO: if the chosen ele is full, cannot use it

		let chosenEle: 1 | 2 = 1

		// case 1: if both elevators are idle, send the nearest one
		if (this.eleOne.currentDirection === 0 && this.eleTwo.currentDirection === 0) {
			chosenEle = this.getNearestElevator(floor)
		}

		// case 2: if one of the elevators is idle
		else if (this.eleOne.currentDirection === 0 || this.eleTwo.currentDirection === 0) {
			const idleEle = this.eleOne.currentDirection === 0 ? 1 : 2
			const busyEle = this.eleOne.currentDirection === 0 ? this.eleTwo : this.eleOne

			// case 2a: check if the busy one is going in the same direction as floor called
			chosenEle = idleEle
			if ((busyEle.nextDirection != 0 && busyEle.nextDirection === direction) || (busyEle.currentDirection === direction)) {
				// send the nearest one
				chosenEle = this.getNearestElevator(floor)
			} // else, send the idle one
		}

		// case 3: both of the elevators are busy
		else {
			// choose the one which is going in the same direction as called
			// else, choose any
			chosenEle = (direction === this.eleOne.currentDirection) ? 1 : 2
		}
		
		console.log(`Sending elevator ${chosenEle}`)
		const posInQueue = this.addFloorToQueue(chosenEle, floor, direction)
		return {
			ele: chosenEle,
			posInQueue
		}
	}

	addFloorToQueue(eleNumber: 1 | 2, floor: number, direction?: 1 | -1): number {
		const ele: Elevator = eleNumber === 1 ? this.eleOne : this.eleTwo
		// if the floor with direction isn't already in the queue
		if (!ele.floorsQueue.includes({ floor, direction })) {
			// if it is between any of the floors already in the queue, then add there
			// else add at the end
			let indexToAdd = ele.floorsQueue.length
			const tempQueue = [ { floor: ele.currentFloor, direction: ele.currentDirection}, ...ele.floorsQueue]
				.map((f) => f.floor) // including current floor
			for (let i = 0; i < tempQueue.length - 1; i++) {
				if (isBetween(floor, tempQueue[i], tempQueue[i + 1])) {
					indexToAdd = i
				}
			}
			let updatedfloorsQueue = [
				...ele.floorsQueue.slice(0, indexToAdd),
				{ floor, direction },
				...ele.floorsQueue.slice(indexToAdd)
			]
			// for consecutive floors which are going down - floors should be in decreasing order
			// index starts from 1 to handle starvation to some level
			// TODO: feature to handle starvation even further - limit on max number of elements in elevator floor queue
			for (let i = 1; i < updatedfloorsQueue.length; i++) {
				if (updatedfloorsQueue[i].direction === -1) {
					const downFloorsArray = [ updatedfloorsQueue[i] ]

					let j = i+1
					let flag = 0
					while (j < updatedfloorsQueue.length && flag === 0) {
						if (updatedfloorsQueue[j].direction === -1) downFloorsArray.push(updatedfloorsQueue[j])
						else flag = 1
						j++
					}
					downFloorsArray.sort((a, b) => b.floor - a.floor) // descending order sort

					updatedfloorsQueue = [
						...updatedfloorsQueue.slice(0, i),
						...downFloorsArray,
						...updatedfloorsQueue.slice(j)
					]

					i = j
				}
			}
			ele.floorsQueue = updatedfloorsQueue
			// console.log(`New queue ${JSON.stringify(ele.floorsQueue)}\n`)

			if (ele.floorsQueue.length >= 2) {
				ele.nextDirection = ele.floorsQueue[1].direction !== undefined ?
					ele.floorsQueue[1].direction : 
					(ele.floorsQueue[1].floor - ele.floorsQueue[0].floor) < 0 ? -1 : 1
			} else {
				ele.nextDirection = 0
			}

			if (ele.floorsQueue.length >= 1) {
				ele.currentDirection = ele.floorsQueue[0].direction !== undefined ?
					ele.floorsQueue[0].direction : 0
			}

			return indexToAdd
		}
		return ele.floorsQueue.findIndex((f) => f === { floor, direction } )
	}

	getNearestElevator(floor: number): 1 | 2 {
		const distOne = Math.abs(this.eleOne.currentFloor - floor)
		const distTwo = Math.abs(this.eleTwo.currentFloor - floor)

		return (distOne < distTwo) ? 1 : 2
	}

	boardPeople(eleNumber: 1 | 2, numPeople: number, destinationFloors: number[]): boolean {
		console.log(`\nEle ${eleNumber} boarded ${numPeople} with direction ${destinationFloors}`)
		const ele = eleNumber === 1 ? this.eleOne : this.eleTwo
		const newTotal = ele.currentLoad + (numPeople * 60);
		if (newTotal > this.maxCap) {
			return false;
		}
		ele.currentLoad = newTotal;
		destinationFloors.forEach((floor) => this.addFloorToQueue(eleNumber, floor))
		return true;
	}
}