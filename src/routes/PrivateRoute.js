import React from 'react';
import Redirect from 'umi/redirect';
class PrivateRoute extends React.Component {
  render() {
    let userInfo = window.localStorage.getItem('userInfo');
    if (userInfo) {
      return this.props.children;
    } else {
      let redirect = this.props.location.pathname;
      let search = this.props.location.search;
      console.log(this.props.location);
      console.log(redirect);
      return (
        <Redirect
          to={{
            pathname: '/login',
            search: `redirect=${redirect + search}`,
          }}
        ></Redirect>
      );
    }
  }
}
export default PrivateRoute;
