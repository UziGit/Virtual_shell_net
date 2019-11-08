import React from 'react';
import Redirect from 'umi/redirect';
class PrivateRoute extends React.Component {
  render() {
    let userInfo = window.localStorage.getItem('userInfo');
    if (userInfo) {
      return this.props.children;
    } else {
      return <Redirect to="/login"></Redirect>;
    }
  }
}
export default PrivateRoute;
