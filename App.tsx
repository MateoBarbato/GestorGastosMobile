import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/store';
import Navigation from './src/navigation/Navigation'; // Crearás un componente para la navegación
import { configureNotifications } from './src/services/notificationService';

const App = () => {

  useEffect(() => {
    configureNotifications();
  }, []);
  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Navigation />
      </PersistGate>
    </Provider>
  );
};

export default App;