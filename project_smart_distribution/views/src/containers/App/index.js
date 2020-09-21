import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import autoBind from 'react-autobind';
import Login from '../Login/Login';
import Home from '../Home'
// import About from '../About';
// import Catalog from '../Catalog';


class App extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
    }
    
    render() {
        return (
                <BrowserRouter>
                    <div className="box">                       
                        <div className="row content">
                            <Switch>
                                 <Route exact path='/' component={Home} /> 
                                 <Route path='/login' component={Login} />
                                <Redirect from='*' to='/404' />
                            </Switch>
                        </div>                        
                    </div>
                </BrowserRouter>
        );
    }
}

export default App;