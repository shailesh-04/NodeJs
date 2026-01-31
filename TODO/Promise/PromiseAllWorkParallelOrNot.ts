


const promise1 = new Promise(resolve => setTimeout(() => resolve('First result'), 2000));
const promise2 = new Promise(resolve => setTimeout(() => resolve('Second result'), 3000));
Promise.all([promise1, promise2])
    .then(result => {
        console.log('Fastest result:', result);
    });



    