import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Weblayout from './components/Weblayout/Weblayout';
import Counter from './container/Counter/Counter';
import Medicine from './container/Medicine/Medicine';
import Patients from './container/Patients/Patients';
import Staff from './container/Staff/Staff';
import { configureStore } from './Redux/Store';
import { PersistGate } from 'redux-persist/integration/react'
import Promise_Example from './container/Example/Promise_Example';
import Example_UseMemo from './container/Example/Example_UseMemo';
import Example_UseCallBack from './container/Example/Example_UseCallBack';

function App() {

  const { store, persistor } = configureStore()

  return (
    <div className="App">
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Weblayout >
            <Switch>
              <Route path={'/medicine'} exact component={Medicine} />
              <Route path={'/patients'} exact component={Patients} />
              <Route path={'/staff'} exact component={Staff} />
              <Route path={'/counter'} exact component={Counter} />
              <Route path={'/example'} exact component={Promise_Example} />
              <Route path={'/exampleusememo'} exact component={Example_UseMemo} />
              <Route path={'/exampleusecallback'} exact component={Example_UseCallBack} />
            </Switch>
          </Weblayout>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;
