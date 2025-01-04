// components/Loader.tsx
const Loader = () => {
    return (
      <div style={styles.loaderContainer}>
        <div style={styles.spinner}></div>
      </div>
    );
  };
  
  const styles = {
    loaderContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "rgba(255, 255, 255, 0.8)", // Optional for overlay
    },
    spinner: {
      width: "50px",
      height: "50px",
      border: "5px solid #ccc",
      borderTop: "5px solid #0070f3", // Primary color
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
    },
  };
  
  // Add keyframes for the spin animation in your global.css or as inline styles
  export default Loader;
  