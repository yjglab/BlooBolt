import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logIn, logOut, offlineStatus } from "../reducers/userSlice";
import NoticeModal from "./NoticeModal";

const AppLayout = ({ children }) => {
  const { noticeCalled } = useSelector((state) => state.global);
  const { me } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  // const logOutWhenCloseWindow = (e) => {
  //   e.preventDefault();
  //   dispatch(logOut());
  // };
  // useEffect(() => {
  //   // if (me && me.id) {
  //   //   dispatch(logIn());
  //   // }
  //   window.addEventListener("beforeunload", logOutWhenCloseWindow);

  //   return () => {
  //     window.removeEventListener("beforeunload", logOutWhenCloseWindow);
  //     // dispatch(offlineStatus())
  //   };
  // }, []);

  return (
    <>
      {children}
      {noticeCalled ? <NoticeModal /> : null}
    </>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AppLayout;
