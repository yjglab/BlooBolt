import PropTypes from "prop-types";
import Navigation from "./Navigation";

const AppLayout = ({ children }) => {
  return (
    <div>
      <Navigation />
      {children}
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AppLayout;
