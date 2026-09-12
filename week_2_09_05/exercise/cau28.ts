const simulateTask = (id: number, time: number): Promise<string> => {
    return new Promise((r) => {
        setTimeout(() => {
            r(`Task ${id} done after ${time}ms`)
        }, time)
    })
}

const batchProcess = async(): Promise<string[]> => {
    const results = await Promise.all([
        simulateTask(1,1000),
        simulateTask(2,500),
        simulateTask(3,1500),
        simulateTask(4,3000),
        simulateTask(5,5000)
    ])
    return results;
}

const run = async () => {
    console.time("batchProcess");
    const results = await batchProcess();
    results.forEach(r => console.log(r))
    console.timeEnd("batchProcess");
}

run();