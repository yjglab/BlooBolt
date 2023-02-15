import PropTypes from "prop-types";
import Footer from "./Footer";

const AppLayout = ({ children }) => {
  return (
    <>
      {children} <Footer />
    </>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AppLayout;
