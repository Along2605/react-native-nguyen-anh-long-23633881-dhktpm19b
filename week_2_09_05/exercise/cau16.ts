const simulateTask = (time: number): Promise<string> => {
    return new Promise<string>((resolve) => {
        setTimeout(() => {
            resolve(`Task done after ${time} ms`)
        },time)
    })
}

const run = async () => {
    console.time("parallel");
    const [result1, result2, result3] = await Promise.all([
        simulateTask(1000),
        simulateTask(500),
        simulateTask(1500)
    ])
    console.log(result1)
    console.log(result2)
    console.log(result3)
    console.timeEnd("parallel");
}

run();