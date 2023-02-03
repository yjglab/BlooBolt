import PropTypes from "prop-types";

const AppLayout = ({ children }) => {
  return <div>{children}</div>;
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AppLayout;
