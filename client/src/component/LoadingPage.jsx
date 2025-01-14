import { CContainer } from "@coreui/react";
import React from "react";

const LoadingPage = () => {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "transparent",
    },
    spinner: {
      width: "50px",
      height: "50px",
      border: "5px solid rgba(0, 0, 0, 0.1)",
      borderTop: "5px solid #3498db",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
    },
    text: {
      marginTop: "20px",
      fontSize: "1.2rem",
      color: "#FFFF",
    },
    "@keyframes spin": {
      from: { transform: "rotate(0deg)" },
      to: { transform: "rotate(360deg)" },
    },
  };

  return (
    <div className='body'>
        <CContainer className="mt-3">
            <div style={styles.container}>
                <div style={styles.spinner}></div>
                <p style={styles.text}>Loading, please wait...</p>
            </div>
        </CContainer>
    </div>
  );
};

export default LoadingPage;
