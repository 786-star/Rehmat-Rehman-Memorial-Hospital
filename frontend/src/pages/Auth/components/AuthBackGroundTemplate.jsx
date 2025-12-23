import React from "react";

const AuthBackGroundTemplate = ({ children }) => {
  return (
    <div className="min-h-[100vh] flex items-center justify-center dark:bg-background">
      <div className="w-full relative max-w-[450px] xl:!w-[550px] md:border md:border-input md:max-w-[600px] md:bg-white/70 md:shadow-md dark:bg-background lg:shadow-lg rounded-[60px] flex items-center justify-center pt-20 md:pt-0">
        {children}
      </div>
    </div>
  );
};

export default AuthBackGroundTemplate;