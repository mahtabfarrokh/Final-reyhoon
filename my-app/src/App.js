import React from 'react';
import { BrowserRouter , Route } from 'react-router-dom';
import './App.css';
import Main from './Main';
import Search from './Search';
import Restaurant from './Restaurant';

function App() {
  return (
    <div className="App">
    <div className="content">
    <link rel="stylesheet" href="https://cdn.rtlcss.com/bootstrap/v4.2.1/css/bootstrap.min.css" integrity="sha384-vus3nQHTD+5mpDiZ4rkEPlnkcyTP+49BhJ4wJeJunw06ZAp+wzzeBPUXr42fi8If" crossorigin="anonymous"></link>
    <link href="https://cdn.rtlcss.com/bootstrap/v4.2.1/font-awesome.css" rel="stylesheet" />
    <link href="https://cdn.rtlcss.com/bootstrap/v4.2.1/solid.css" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous"></link>
      <BrowserRouter>
               
                <Route exact path="/search" render={()=>{return(
                    <Search />
                  )}}
                />
                 <Route path="/restaurant/:restaurant" render={()=>{return(
                    <Restaurant />
                  )}}
                />
                <Route exact path="/" render={()=>{return(
                    <Main />
                  )}}
                />
                
          </BrowserRouter>
          </div>
      </div>
  );
}

export default App;
