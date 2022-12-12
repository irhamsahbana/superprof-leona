import React from "react";
import { Provider } from 'react-redux';
import Routing from "./routes";
import store from "./redux/store";


function App() {
  return (
    <Provider store={store}>
      <Routing/>
    </Provider>
  );
}

export default App;
