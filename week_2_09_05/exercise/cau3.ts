const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject("Something went wrong");
    },1000)
})

myPromise
 .then(result => {
    console.log(result)
 })
  .catch(error => {
    console.log(error)
  })