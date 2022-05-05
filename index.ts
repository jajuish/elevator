// TODO: handle that floor is already pressed

import BuildingSystem from "./src/system";

/**
 * A kind of real-world "timed" system preview, but this does not preview the functionality 
 * to press buttons once inside the elevator.
 * This demo just calls the lift at every floor
 * 
 * In order to press buttons inside the elevator, use function elevator.boardPeople()
 */
{
// if (false) {
	const elevator = new BuildingSystem(true)
	
	setTimeout(() => { elevator.call(2, 1) }, 1000)
	setTimeout(() => { elevator.call(1, -1) }, 2000)
	setTimeout(() => { elevator.call(4, 1) }, 3000)
	setTimeout(() => { elevator.call(8, 1) }, 4000)
	setTimeout(() => { elevator.call(16, -1) }, 5000)
	setTimeout(() => { elevator.call(31, 1) }, 6000)
	setTimeout(() => { elevator.call(36, 1) }, 7000)
	setTimeout(() => { elevator.call(43, -1) }, 8000)
	setTimeout(() => { elevator.call(38, 1) }, 9000)
	setTimeout(() => { elevator.call(131, -1) }, 10000)
	setTimeout(() => { elevator.call(68, 1) }, 11000)
	setTimeout(() => { elevator.call(90, -1) }, 12000)
	setTimeout(() => { elevator.call(92, 1) }, 13000)
	setTimeout(() => { elevator.call(188, -1) }, 14000)
	setTimeout(() => { elevator.call(192, -1) }, 14000)
	setTimeout(() => { elevator.call(0, 1) }, 14000)
	setTimeout(() => { elevator.call(35, -1) }, 16000)
	setTimeout(() => { elevator.call(49, -1) }, 17000)
	// process.exit(1);
}
	
	
/**
 * 
 */
// {
if (false) {
	const elevator = new BuildingSystem(true)
	
	const c1 = elevator.call(2,1)
	setTimeout(() => { elevator.boardPeople(c1.ele, 6, [15, 17]) }, 1000*(c1.posInQueue+1))
	
	const c2 = elevator.call(1,-1)
	setTimeout(() => { elevator.boardPeople(c2.ele, 1, [0]) }, 1000*(c2.posInQueue+1))
	
	const c3 = elevator.call(1,-1)
	setTimeout(() => { elevator.boardPeople(c3.ele, 1, [0]) }, 1000*(c1.posInQueue+1))
	
	const c4 = elevator.call(4,1)
	setTimeout(() => { elevator.boardPeople(c4.ele, 1, [7]) }, 1000*(c1.posInQueue+1))
	
	const c5 = elevator.call(8,1)
	setTimeout(() => { elevator.boardPeople(c5.ele, 2, [10]) }, 1000*(c1.posInQueue+1))
	
	const c6 = elevator.call(16,-1)
	setTimeout(() => { elevator.boardPeople(c6.ele, 1, [4]) }, 1000*(c1.posInQueue+1))
	
	const c7 = elevator.call(36,1)
	setTimeout(() => { elevator.boardPeople(c7.ele, 2, [89, 42]) }, 1000*(c1.posInQueue+1))

	// process.exit(1);
}