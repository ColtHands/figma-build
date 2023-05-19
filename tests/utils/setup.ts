// import { beforeAll } from "vitest";
// import { spawn } from "node:child_process";

// const buildPackage = function() {
//     const buildProcess = spawn('pnpm', ['run', 'build'], { shell: true, stdio: 'inherit' })

//     // handle errors
//     buildProcess.on('error', (err) => {
//         console.log("Error", err)
//     })

//     // handle exit

//     buildProcess.on('exit', (code) => {
//         console.log("Exit", code)
//     })
// } 

// /**
//  * 
//  */
// beforeAll(() => {
//     buildPackage()
// })