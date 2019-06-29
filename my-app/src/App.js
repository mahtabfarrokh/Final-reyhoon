import React from 'react';
import { BrowserRouter , Route } from 'react-router-dom';
import './App.css';
import Main from './Main';
import Search from './Search';

function App() {
  return (
    <div className="App">
    <div className="content">
    <link rel="stylesheet" href="https://cdn.rtlcss.com/bootstrap/v4.2.1/css/bootstrap.min.css" integrity="sha384-vus3nQHTD+5mpDiZ4rkEPlnkcyTP+49BhJ4wJeJunw06ZAp+wzzeBPUXr42fi8If" crossorigin="anonymous"></link>
      <BrowserRouter>

                <Route path="/search" render={()=>{return(
                    <Search />

                  )}}
                />
                <Route path="/main" render={()=>{return(
                    <Main />

                  )}}
                />
                <Route path="/login" render={()=>{return(
                    <h1>some information ! </h1>

                  )}}
                />
          </BrowserRouter>
          </div>
      </div>
  );
}

export default App;
