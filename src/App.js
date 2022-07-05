import { Route, Switch } from 'react-router-dom';
import './App.css';
import Weblayout from './components/Weblayout/Weblayout';
import Medicine from './container/Medicine/Medicine';
import Patients from './container/Patients/Patients';
import Staff from './container/Staff/Staff';

function App() {
  return (
    <div className="App">
      <Weblayout >
        <Switch>
          <Route path={'/medicine'} exact component={Medicine}/>
          <Route path={'/patients'} exact component={Patients}/>
          <Route path={'/staff'} exact component={Staff}/>
        </Switch>
      </Weblayout>
    </div>
  );
}

export default App;
