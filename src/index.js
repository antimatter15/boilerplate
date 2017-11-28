import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './app'

const reactRoot = document.createElement('div')
reactRoot.id = 'root'
document.body.appendChild(reactRoot)

const render = Component =>
    ReactDOM.render(
        <AppContainer><Component /></AppContainer>, reactRoot);

render(App)
if (module.hot) module.hot.accept('./app', () => render(App) );