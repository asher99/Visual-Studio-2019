import React from 'react';
import Button from '../../Components/Button'

export default class Home extends React.Component {

  navigateTo(key) {
    this.props.history.push(key);
  }
  render(){  
    return (
      <Button css={"PrimaryButton"} title={"Login"} width={"w100px"} 
        onClick={this.navigateTo.bind(this, '/login')}/>  
    );
  }
}
