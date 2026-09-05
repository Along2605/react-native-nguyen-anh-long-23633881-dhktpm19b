const simulateTask = (time: number) =>{
    const promise = new Promise((rs, rj) => {
        if(time < 0){
            rj(new Error("Số không hợp lệ"));
            return;
        }

        setTimeout(()=> {
   rs("Task done")
        }, time);
         
        
    })
    return promise;
}

const run = async () =>{
    try {
        const result = await simulateTask(-100);
        console.log(result)
    } catch (error) {
        console.log(error)
    }
}
run();