import PropTypes from "prop-types";
import { useSelector } from "react-redux";
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
