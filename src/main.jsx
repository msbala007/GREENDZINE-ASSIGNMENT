import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import {ApolloClient,ApolloProvider,InMemoryCache} from "@apollo/client"

const client=new ApolloClient({
  cache:new InMemoryCache(),
  uri:"http://localhost:4000/graphql"
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
 <ApolloProvider client={client}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </ApolloProvider>
   
  </React.StrictMode>,

)
