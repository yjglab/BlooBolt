import PropTypes from "prop-types";

const AppLayout = ({ children }) => {
  return <>{children}</>;
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AppLayout;
