import React from "react";

const sizes = {
  "3xl": "text-8xl font-bold md:text-5xl",
  "2xl": "text-[64px] font-bold md:text-5xl",
  xl: "text-5xl font-bold md:text-[44px] sm:text-[38px]",
  s: "text-[32px] font-bold md:text-3xl sm:text-[28px]",
  md: "text-4xl font-bold md:text-[34px] sm:text-[32px]",
  xs: "text-2xl font-semibold md:text-[22px]",
  lg: "text-[40px] font-bold md:text-[38px] sm:text-4xl",
};

const Heading = ({ children, className = "", size = "xs", as, ...restProps }) => {
  const Component = as || "h6";

  return (
    <Component className={`text-white-A700 font-titilliumweb ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Heading };
