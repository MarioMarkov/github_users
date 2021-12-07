import { Fragment,Component } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import Users  from './components/Users/Users';
import axios from 'axios' 
import Search from './components/Users/Search';

class App extends Component  {
  state  ={
    users :[],
    loading:false
  }

  async componentDidMount(){
    this.setState({loading:true})
    const res  = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`);
    this.setState({users : res.data,loading:false})
  }
  
  render(){
    return (
      <Fragment>
       <Navbar icon="fab fa-github" title ="Github Finder"/>
       <div className="container">
         <Search/>
        <Users loading = {this.state.loading} users  = {this.state.users}/>
       </div>
       
      </Fragment>
    );
  }
  
}

export default App;

