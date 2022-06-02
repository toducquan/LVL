import './App.css';
import Navbar from './components/Navbar';
import Section from './components/Section';
import { BrowserRouter as Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import 'antd/dist/antd.css';

function App() {
  const user = useSelector((state: any) => state.auth.user);

  return (
    <div>
      <Router>
        <Navbar role={user?.role}/>
        <Section role={user?.role}/>
      </Router>
    </div>
  );
}

export default App;