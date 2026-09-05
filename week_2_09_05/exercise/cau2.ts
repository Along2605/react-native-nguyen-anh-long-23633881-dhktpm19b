const myPromise = new Promise<number>((resolve, reject) => {
    setTimeout(() => {
        resolve(10)
    },1000)
})

myPromise.then((result) =>{
    console.log(result)
})