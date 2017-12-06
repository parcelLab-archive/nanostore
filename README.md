# nanostore 👛
A tiny state manager for reactive apps.  
E.g. use with react, preact, yo-yo ...

## Install
```
npm i nanostore
```

## Usage
```javascript

const Nanostore = require('nanostore')

// create new nanostore with initial state
const myStore = new Nanostore({ foo: false })

// subscribe to store changes
myStore.subscribe(newState => {
  console.log('Wow the state changed...')
  console.log(newState)
})

// modify the state (works like Reacts setState() ...)
myStore.set({ foo: 'bar' })

// get state
myStore.get()

// create custom events
myStore.on('fetchSomeApi', (endpoint) => {
  fetch('https://some-cool.api/v2/' + endpoint)
  .then(res => res.json)
  .then(data => myStore.set({ apiData: data }))
})

// call custom events
myStore.emit('fetchSomeApi', 'products')

// actually thats it! 
```

