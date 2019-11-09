import { withRouter } from 'react-router-dom';
import { NavBar, Icon } from 'antd-mobile';

const NavBars = props => {
  return (
    <NavBar
      mode="light"
      icon={<Icon type="left" />}
      onLeftClick={() => {
        props.history.push('/');
      }}
    >
      {props.children}
    </NavBar>
  );
};

let MyNavBar = withRouter(NavBars);

export default MyNavBar;
