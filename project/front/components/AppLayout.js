import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logIn, logOut, offlineStatus } from "../reducers/userSlice";
import NoticeModal from "./NoticeModal";

const AppLayout = ({ children }) => {
  const { noticeCalled } = useSelector((state) => state.global);

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
