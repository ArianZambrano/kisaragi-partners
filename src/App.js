import './App.css';
import { BrowserRouter as Router,
         Routes,
         Navigate,
         Route
       } from 'react-router-dom';
import { UserProvider } from './context/userContext';
import routes from './config/routes';


function App() {
  return (
   <Router>
    <UserProvider>
      <Routes>
          {/*ROOT PATH*/}
          <Route path="/" element={<Navigate to="/home" replace/>}>
          </Route>
          {
            routes.map(route => (
              <Route key={route.path} path={route.path} element={route.element}></Route>
            ))
          }
      </Routes>
    </UserProvider>
   </Router>
  );
}

export default App;
