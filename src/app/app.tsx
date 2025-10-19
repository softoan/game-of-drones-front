import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Routing } from "./routing";
import { Provider } from "react-redux";
import { store } from "./store";

const _App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </Provider>
  );
};

export default _App;
