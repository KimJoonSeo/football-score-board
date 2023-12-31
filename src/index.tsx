import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  QueryClient,
  QueryClientConfig,
  QueryClientProvider,
} from '@tanstack/react-query'
import {PaginationProvider} from "./contexts";

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

const config: QueryClientConfig = {
  defaultOptions: {
    queries: {
      networkMode: 'always',
    },
    mutations: {
      networkMode: 'always',
    },
  },
}

const queryClient = new QueryClient(config)

root.render(
  <QueryClientProvider client={queryClient}>
    <PaginationProvider>
      <App />
    </PaginationProvider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
