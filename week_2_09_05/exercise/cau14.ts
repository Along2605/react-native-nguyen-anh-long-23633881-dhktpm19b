
const multiNumber = async (num: number) => {
    await new Promise<void>(r => {
        setTimeout(() => {},1000);
        r();
    })
    return num*3;
}

const run = async () => {
    const result = await multiNumber(25);
    console.log(result);
}

run();