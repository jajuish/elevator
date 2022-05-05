/*
Requirements
Number of floors: 200
Number of elevators in a building: 2
Max passenger-carrying capacity: 400kg
Need to be secure and operational.
*/

// TODO: handle that floor is already pressed

import BuildingSystem from "./src/system_deprecated";

const system = new BuildingSystem(2, 200, 400)

// setTimeout(() => { system.call(2, 1) }, 6000)
// setTimeout(() => { system.call(1, -1) }, 8000)
// setTimeout(() => { system.call(3, 1) }, 10000)

system.call(2, 1)
system.call(1, -1)
system.call(3, 1)