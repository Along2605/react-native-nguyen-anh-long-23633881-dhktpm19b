const simulateTask = (time: number) => {
    const myPromise = new Promise((resolve, reject) => {
        setTimeout(()=>{
            resolve("Task done")
        },time)
    })
    return myPromise
}

simulateTask(1000).then(result => console.log(result))