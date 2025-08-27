import './App.css'
import  WelcomePage from './Pages/WelcomePage';
import { Routes, Route } from 'react-router-dom';
import Homepage from './Pages/HomePage';
import { LoginForm } from './Forms/LoginForm';
import { SignupForm } from './Forms/signupForm';
import  JRules  from './Java/JavaRules';
import PRules from './Python/PRules';
import JSRules from './JavaScript/JSRules';
import JQuestions from './Java/JQuestions';
import ShowScore from './Java/ShowScore';
import PQuestions from './Python/PQuestions';
import JSQuestions from './JavaScript/JSQuestions';
import Profile from './Navbar/Profile';
import PrivateRoute from './PrivateRoute/PrivateRoute';

function App() {
 return(
 <>
  <Routes>
    <Route path='/' element={<WelcomePage />} />
    <Route path='/LoginForm' element={<LoginForm />} />
    <Route path='/signupForm' element={<SignupForm />} />
     <Route path='HomePage' element={ <PrivateRoute> <Homepage /> </PrivateRoute>} /> 
    <Route path='/JRules' element={      <PrivateRoute><JRules />    </PrivateRoute>} />
    <Route path='/PRules' element={      <PrivateRoute><PRules />    </PrivateRoute>} />
    <Route path='/JSRules' element={     <PrivateRoute><JSRules />   </PrivateRoute>} />
    <Route path='/JQuestions' element={  <PrivateRoute><JQuestions/>   </PrivateRoute>}/>
    <Route path='/ShowScore' element={   <PrivateRoute><ShowScore /> </PrivateRoute>}/>
    <Route path='/PQuestions' element={  <PrivateRoute><PQuestions />  </PrivateRoute>}/>
    <Route path='/JSQuestions' element={ <PrivateRoute><JSQuestions/>  </PrivateRoute>}/>
    <Route path='/Profile' element={     <PrivateRoute><Profile />   </PrivateRoute>}/>
  </Routes>
 </>
  );
}

export default App
