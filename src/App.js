import './App.css';
import React from 'react'
import {getRandomColor} from './utils/utils'

class App extends React.Component {
  
  constructor(props){
    super(props);

    this.state = {
      firstName:"",
      lastName:"",
      email:"",
      submitStatus:null
    }
  }

  onSubmit = () => {
    
    var data = { 
      firstName:this.state.firstName,
      lastName:this.state.lastName,
      email:this.state.email
    }

    fetch("http://localhost:3000/checkData",
    {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method:"POST",
      body:JSON.stringify(data)
    })
    .then(response => response.json())
    .then((data) => {
      let status = data.status
      this.setState({
        submitStatus: status
      })
    })
    .catch((error) => {
      this.setState({
        submitStatus:"failed"
      })
    });

  }

  firstNameOnChange = (e) => {
    this.setState({
      firstName: e.target.value
    })
  }

  lastNameOnChange = (e) => {
    this.setState({
      lastName: e.target.value
    })
  }

  emailOnChange = (e) => {
    this.setState({
      email: e.target.value
    })
  }
  
  onBlur(e){
    var element = e.target
    element.style.borderColor = getRandomColor();
  }

  render () {
    return (
      <div className="App">
          <h3>First Name</h3>
          <input className="field" onChange={this.firstNameOnChange} onBlur={this.onBlur} value={this.state.firstName} />
          <h3>Last Name</h3>
          <input className="field" onChange={this.lastNameOnChange} onBlur={this.onBlur} value={this.state.lastName} />
          <h3>Email</h3>
          <input className="field" onChange={this.emailOnChange} onBlur={this.onBlur} value={this.state.email} />
          <br/>
          <button className={`${this.state.submitStatus}_button`} onClick={this.onSubmit}> 
            Submit
          </button>
      </div>
    )
  }
}

export default App;
