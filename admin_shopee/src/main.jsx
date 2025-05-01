import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider,  App as AntdApp } from 'antd'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ConfigProvider>
      <AntdApp>
        <StrictMode>
          <App />
        </StrictMode>
      </AntdApp>
    </ConfigProvider>
  </BrowserRouter>
)
