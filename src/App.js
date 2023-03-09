
import './App.css';
import AddUser from "./components/AddUser"
import UserList from './components/UserList';
// import { UserList } from './components/UserList';
import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {
  return (
    // <div>
    //     <UserList/>
    //     {/* <AddUser/> */}
    // </div>
    <BrowserRouter>
    <Routes>
      <Route exact path ="/" element ={
        <UserList/>
      }/>
      <Route exact path ="/AddUser" element ={
        <AddUser/>
      }/>
      
    </Routes>
    </BrowserRouter>
  );
}
export default App;
