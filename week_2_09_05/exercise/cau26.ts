const waiting = async ():Promise<string> => {
    return new Promise<string>((r) => {
        setTimeout(() => {
            r("after waiting 5s");
        }, 5000);
    })
}

const run = async () => {
  const data:string = await waiting();
  console.log(data);
}

run();


