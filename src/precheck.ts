// confirm that all needed .env variables are available
// if something isn't available: THROW specific message

const e = process.env;
let noErrors = true

const fail = (msg: string) => {
  console.warn(msg);
  noErrors = false
}



// check .env params
if (!e.REDIS_HOST) fail(".env missing REDIS_HOST");
if (!e.REDIS_PORT) fail(".env missing REDIS_PORT");


// check if bullmq is available at redis url:port



export default () => noErrors;
