import { Fragment, Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from "./components/layout/Navbar";
import { Alert } from "./components/layout/Alert";
import Users from "./components/Users/Users";
import axios from "axios";
import Search from "./components/Users/Search";
import PropTypes from "prop-types";
import {About} from './components/pages/About'
import User from "./components/Users/User";

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null,
    user:{},
  };
  static propTypes = {
    searchUsers: PropTypes.func,
  };

  searchUsers = async (text) => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    
    this.setState({ users: res.data.items, loading: false });
  };
  clearUsers = () => {
    this.setState({ users: [], loading: false });
  };

  getUser = async (username) =>{
    
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    console.log(res)
    this.setState({ user: res.data, loading: false });
  }

  setAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });

    setTimeout(() => {
      this.setState({ alert: null });
    }, 3000);
  };

  render() {
    const { users, loading, alert ,user} = this.state;
    return (
      <Router>
        <Fragment>
          <Navbar icon="fab fa-github" title="Github Finder" />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route
                exact path='/'
                render={props=>( 
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0 ? true : false}
                      setAlert={this.setAlert}
                    />
                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              />
              <Route exact path ='/about'
              component={About}/>
              <Route exact path ='/user/:login'
              render={props=>(
                <User {...props} getUser={this.getUser} user={user}
                loading ={loading}/>
              )}/>
              
            </Switch>
          </div>
        </Fragment>
      </Router>
    );
  }
}

export default App;
