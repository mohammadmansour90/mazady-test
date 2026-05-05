import { Footer, Header } from "../../routes";
import PropTypes from "prop-types";


export const Layout = ({children}) => {

  
  return (
    <>
        <Header/>
            <main>
                {children}
            </main>
        <Footer/>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.any,
};

