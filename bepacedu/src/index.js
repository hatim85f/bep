import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { Provider } from "react-redux";
import { getStorage } from "firebase/storage";
import AppNavigator from "./components/layout/Navigator";
import store from "./store";

const firebaseConfig = {
  apiKey: "AIzaSyD7slkEvHPZyZwtpyIfU2EHa6RJmqv60jg",
  authDomain: "bepac-81896.firebaseapp.com",
  projectId: "bepac-81896",
  storageBucket: "bepac-81896.appspot.com",
  messagingSenderId: "931391604604",
  appId: "1:931391604604:web:1e4a35829f75903a4206f9",
  measurementId: "G-YVPLPW917C",
};

const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <AppNavigator>
          <App />
        </AppNavigator>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
