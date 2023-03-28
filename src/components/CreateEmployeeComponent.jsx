import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';

class CreateEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            // step 2
            id: this.props.match.params.id,
            type: '',
            side: '',
            range: '',
            email: ''
        }
        this.changetypeHandler = this.changetypeHandler.bind(this);
        this.changesideHandler = this.changesideHandler.bind(this);
        this.changerangeHandler = this.changerangeHandler.bind(this);
        this.changeemailHandler = this.changeemailHandler.bind(this);
        this.saveOrUpdateUser = this.saveOrUpdateUser.bind(this);
    }

    // step 3
    componentDidMount(){

        // step 4
        if(this.state.id === '_add'){
            return
        }else{
            EmployeeService.getUserById(this.state.id).then( (res) =>{
                let user = res.data;
                this.setState({type: user.type,
                    side: user.side,
                    range: user.range,
                    email : user.email
                });
            });
        }        
    }
    saveOrUpdateUser = (e) => {
        e.preventDefault();
        let user = {type: this.state.type, side: this.state.side,range: this.state.range,email: this.state.email};
        console.log('user => ' + JSON.stringify(user));

        // step 5
        if(this.state.id === '_add'){
            EmployeeService.createUser(user).then(res =>{
                this.props.history.push('/users');
            });
        }else{
            EmployeeService.updateUser(user, this.state.id).then( res => {
                this.props.history.push('/users');
            });
        }
    }
    
    changetypeHandler= (event) => {
        this.setState({type: event.target.value});
    }

    changesideHandler= (event) => {
        this.setState({side: event.target.value});
    }

    changerangeHandler= (event) => {
        this.setState({range: event.target.value});
    }
    changeemailHandler= (event) => {
        this.setState({email: event.target.value});
    }
    cancel(){
        this.props.history.push('/users');
    }

    getTitle(){
        if(this.state.id === '_add'){
            return <h3 className="text-center">Add user</h3>
        }else{
            return <h3 className="text-center">Update user</h3>
        }
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                {
                                    this.getTitle()
                                }
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> type: </label>
                                            <input placeholder="Type" name="type" className="form-control" 
                                                value={this.state.type} onChange={this.changetypeHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Side: </label>
                                            <input placeholder="Side" name="side" className="form-control" 
                                                value={this.state.side} onChange={this.changesideHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Range: </label>
                                            <input placeholder="Range" name="range" className="form-control" 
                                                value={this.state.range} onChange={this.changerangeHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Email Id: </label>
                                            <input placeholder="Email Address" name="email" className="form-control" 
                                                value={this.state.email} onChange={this.changeemailHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.saveOrUpdateUser}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        )
    }
}

export default CreateEmployeeComponent
