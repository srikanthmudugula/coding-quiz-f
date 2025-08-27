import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { QuestionP } from '../src/QuestionP/QuestionProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter>
   <QuestionP>
    <App />
    </QuestionP>
    </BrowserRouter>
  </StrictMode>,
)
