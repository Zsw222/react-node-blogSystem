import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Route, Redirect } from 'react-router-dom'

class AuthRouter extends Component {
    render() {  
        const { component: Component, ...rest } = this.props
        const isLogged = sessionStorage.getItem("token") ? true : false;
      
        return (
            <Route {...rest} render={props => {
              return isLogged
                  ? <Component {...props} />
                  : <Redirect to="/LoginUser" />
            }} />
        )
      }
}

export default withRouter(AuthRouter); 