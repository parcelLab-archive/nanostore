# nanostore 👛
> ⚠️ Deprecated: this module is no longer beeing maintained. There are a few better options on the market as: MobX, Zustand...

A tiny state manager for reactive apps.  
E.g. use with react, preact, yo-yo ...  
- Small in size
- Works with ie 10 and up
- Fast and simple

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

## API
### new Store
Creates a new Store object.
#### Parameters
- [initialData: Object]

### Store.prototype.set
Sets the state (like in Reacts setState ...)  
The set Function modifies current state like this: `state = { ...state, ...newState}`  
(Existing props will be overwritten or kept)
#### Parameters
- stateModifier: Object

### Store.prototype.get
Return current state object

### Store.prototype.subscribe
Creates a Subscription that will be rerun on every state change.
#### Parameters
- fn: Function

### Store.prototype.on
Creates custom events.  
Comes in handy if you want to create state actions (like fetching something from an API etc...)
#### Parameters
- eventName: String
- fn: Function

### Store.prototype.emit
Calls an custom event.  
Normally you would pass that down to your UI Components, so they can call custom events...
### Parameters
- eventName: String
- [data: Any]

## How to use with a UI library (yo-yo in this case)
```javascript
// main.js

const Nanostore = require('nanostore')
const yo = require('yo-yo')

const App = require('./components/App');
const store = new Nanostore({ count: 0 })

let app = App(store.get(), store.emit)

store.subscribe(state => {
  yo.update(app, App(state, store.emit)) // rerenders app on state change (yo-yos diffing algoryth will do the work)
})

store.on('increment', num => {
  const oldCount = store.get().count
  const newCount = oldCount + num
  store.set({ count: newCount })
})

document.body.appendChild(app)


// components/app.js

const yo = require('yo-yo')

module.exports = function App(state, emit) {
  const handleClick = evt => {
    emit('increment', 1)
  }

  return yo`
    <div>
      <h1>The current count is: ${ state.count }</h1>
      <button onclick=${handleClick}>increment</button>
    </div>
  `
}
```
