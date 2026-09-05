const randomNumber = Math.random();

const myPromise = new Promise<number>((resolve, reject) => {
    if(randomNumber > 0.5){
        resolve(randomNumber)
    }
    else{
        reject(randomNumber)
    }
})

myPromise
 .then(result =>{
    console.log(result);
 })
  .catch(error =>{
    console.log("Error " + error )
  })
