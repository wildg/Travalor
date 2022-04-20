import PropTypes from 'prop-types';

function SplashScreen({ backgroundImg, children }) {
  // Initialize a background image as nothing
  let bgImage = {};

  // If background image is not undefined, we cre
  if (backgroundImg !== undefined) {
    bgImage = { background: "url('" + backgroundImg + "')" };
  }

  return (
    <div className="splash-screen" style={bgImage}>
      {children}
    </div>
  );
}

SplashScreen.propTypes = {
  backgroundImg: PropTypes.string,
  children: PropTypes.node,
};

export default SplashScreen;
