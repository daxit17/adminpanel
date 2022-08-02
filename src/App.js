import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Weblayout from './components/Weblayout/Weblayout';
import Counter from './container/Counter/Counter';
import Medicine from './container/Medicine/Medicine';
import Patients from './container/Patients/Patients';
import Staff from './container/Staff/Staff';
import { configureStore } from './Redux/Store';

function App() {

  const store = configureStore()

  return (
    <div className="App">
      <Provider store={store}>
        <Weblayout >
          <Switch>
            <Route path={'/medicine'} exact component={Medicine} />
            <Route path={'/patients'} exact component={Patients} />
            <Route path={'/staff'} exact component={Staff} />
            <Route path={'/counter'} exact component={Counter} />
          </Switch>
        </Weblayout>
      </Provider>
    </div>
  );
}

export default App;
