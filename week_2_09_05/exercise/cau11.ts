const myPromise = new Promise((resolve, reject)=> {
    setTimeout(()=> {
        resolve("Hello Async")
    },2000)
}) 

async function run(){
    const result = await myPromise;
    console.log(result)
}

run()