// TODO: handle that floor is already pressed

import BuildingSystem from "./src/system";

const elevator = new BuildingSystem()

setTimeout(() => { elevator.call(2, 1) }, 1000)
setTimeout(() => { elevator.call(1, -1) }, 2000)
setTimeout(() => { elevator.boardPeople(2, 1, [4]) }, 2000)
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
setTimeout(() => { elevator.call(0, 1) }, 14000)
setTimeout(() => { elevator.call(35, -1) }, 16000)
setTimeout(() => { elevator.call(49, -1) }, 17000)