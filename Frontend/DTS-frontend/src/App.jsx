import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

import Header from './components/Header'
import { Tasks } from './pages/Tasks'
import Task from './pages/Task';

function App() {
  

  return (
    <>
      <div className='allApp'>
        <Header />
        <Tasks /> 
        

      </div>
    </>
  )
}

export default App
