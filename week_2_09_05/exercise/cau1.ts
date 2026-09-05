const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Hello Async");
    },2000)
})

myPromise.then((result) =>{
    console.log(result);
})