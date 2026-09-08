const simulateTask = (time: number): Promise<string> => {
    return new Promise<string>((resolve) => {
        setTimeout(() => {
            resolve(`Task done after ${time} ms`);
        }, time);
    })
}
console.time("run");

const run = async () => {
    const result1 = await simulateTask(1000);
    console.log(result1)
    const result2 = await simulateTask(500);
    console.log(result2)
    const result3 = await simulateTask(1500);
    console.log(result3)

    console.timeEnd("run");
}

run();