import PropTypes from "prop-types";
import Footer from "./Footer";

const AppLayout = ({ children }) => {
  return <>{children}</>;
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AppLayout;
