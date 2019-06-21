import React from 'react';
import { BrowserRouter , Route } from 'react-router-dom';
import './App.css';
import MyHeader from './MyHeader';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <BrowserRouter>
            <div className="main-content">
              <div className="workspace">
                <Route path="/main" render={()=>{return(
                    <MyHeader />

                  )}}
                />
                <Route path="/login" render={()=>{return(
                    <h1>some information ! </h1>

                  )}}
                />
              </div>
            </div>
          </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
