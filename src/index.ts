import { Component, createElement as R } from 'react'
import { render as renderDOM } from 'react-dom'
import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Map } from 'immutable'

type CounterAction = 'INCREMENT' | 'DECREMENT'

function counter( state = Map<string,number>({counter: 0}), action: { type: CounterAction }) {
	switch (action.type) {
		case 'INCREMENT':
			return state.set( 'counter', state.get( 'counter' ) + 1 )
		case 'DECREMENT':
			return state.set( 'counter', state.get( 'counter' ) - 1 )
		default:
			return state
	}
}

type CounterProps = {
	value: Map<string,number>
	onIncrement: () => void
	onDecrement: () => void
}

class Counter extends Component<CounterProps, {}> {
	render() {
		const { value, onIncrement, onDecrement } = this.props
		return R( "p", {},
			R( "h2", {}, `Clicked: ${value.get( 'counter' )} times`),
			R( "button", { className: "btn btn-primary btn-lg", onClick: onIncrement }, 
				R( "span", { className: "glyphicon glyphicon-plus", "aria-hidden": "true"})
			),
			R( "button", { className: "btn btn-default btn-lg", onClick: onDecrement },
				R( "span", { className: "glyphicon glyphicon-minus", "aria-hidden": "true"})
			)
		)
	}
}

const store = createStore( counter, Map( {counter: 0}), composeWithDevTools() )
let rootEl: HTMLElement | null = null

function render() {
	if ( rootEl !== undefined ) {
	renderDOM( R( Counter, {
		value: (<Map<string,number>>store.getState()),
		onIncrement: () => store.dispatch( { type: 'INCREMENT' }),
		onDecrement: () => store.dispatch( { type: 'DECREMENT' })
	}), rootEl )
	}
}

store.subscribe(render)

export function embed( elementId: string ) {
	rootEl = document.getElementById( elementId )
	render()
}

embed( 'root' )
