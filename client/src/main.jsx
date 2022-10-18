/** @format */

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import { App } from './App'
import { store } from './redux/store'

import './index.scss'
import Kommunicate from "@kommunicate/kommunicate-chatbot-plugin";

Kommunicate.init("a2c6e5c1e5688b708e360286821c7ad" ,{"popupWidget":true,"automaticChatOpenOnNavigation":true})

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
)
