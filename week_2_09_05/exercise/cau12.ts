const simulateTask = (time: number) =>{
    const promise = new Promise((resolve, reject) =>{
        setTimeout(()=>{
            resolve("Task done")
        },time)
    })
    return promise;
}

const run = async () =>{
    const result = await simulateTask(2000);
    console.log(result);
}

run();