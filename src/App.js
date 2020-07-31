import React from 'react';
import './App.css';
import Users from "./components/users/Users"
import Navbar from './components/layout/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NotFound from './components/pages/NotFound';
import EditUser from './components/users/EditUser';
import AddUser from './components/users/AddUser';
import ViewUser from './components/users/ViewUser';
import AddComptable from './components/comptables/AddComptable';
import ViewComptable from './components/comptables/ViewComptable';
import EditComptable from './components/comptables/EditComptable';
import SelectToAddUser from './components/pages/SelectToAddUser';
import AddSociete from './components/societe/AddSociete';
import ViewSociete from './components/societe/ViewSociete';
import EditSociete from './components/societe/EditSociete';


function App() {
  return (
    <Router>
       <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/users" component={Users} />
        <Route exact path="/users/add" component= {AddUser} />
        <Route exact path="/users/edit/:id" component= {EditUser} />
        <Route exact path="/users/view/:id" component= {ViewUser} />
        <Route exact path="/users/add/comptable" component= {AddComptable} />
        <Route exact path="/users/view/comptable/:id" component= {ViewComptable} />
        <Route exact path="/users/edit/comptable/:id" component= {EditComptable} />
        <Route exact path="/users/add/societe" component= {AddSociete} />
        <Route exact path="/users/view/societe/:id" component= {ViewSociete} />
        <Route exact path="/users/edit/societe/:id" component= {EditSociete} />
        <Route exact path="/users/stau" component= {SelectToAddUser} />

        <Route component={NotFound} />
      </Switch>
    </div>
    </Router>
  );
}

export default App;
