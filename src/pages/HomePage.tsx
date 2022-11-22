import React from "react";

const HomePage = () => {
  return (
    <div
      style={{
        height: "calc(100vh - 72px)",
        backgroundImage: `url(https://nordiccoder.com/app/uploads/2019/12/phan-mem-product-management-background.png)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1
        style={{ position: "absolute", top: "30%", left: "8%" }}
        className="u-text1100 u-fontBold u-textWhite"
      >
        Management <br /> System
      </h1>
    </div>
  );
};

export default HomePage;
