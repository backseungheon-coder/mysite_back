import React from 'react';
import {Redirect, Route} from "react-router-dom";
import {useSelector} from "react-redux";
import {jwtUtils} from "../utils/JwtUtils";

const PrivateRoute = (props) => {
  // BrowseRouter로 부터 넘어오는 props를 파악하는게 중요.
  // path, setMenu, ....
  console.log(props)
  const {component: RouteComponent, setMenu, path} = props;
  const token = useSelector(state => state.Auth.token);

  // redirectUrl은 로그인이 성공후 돌아갈 화면이다.
  if (!jwtUtils.isAuth(token)) {
    alert('로그인이 필요한 페이지입니다');
    return <Redirect to={`/signin?redirectUrl=${path}`}/>
  }

  return (
    <Route
      path={path}
      render={
        props => <RouteComponent setMenu={setMenu} {...props}/>
      }
    />
  );
}

export default PrivateRoute;