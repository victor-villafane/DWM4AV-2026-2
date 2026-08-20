import { parentPort } from "worker_threads"

for( let i = 0; i < 100000000000 ; i++ ){}

parentPort.postMessage("OK")