import React from "react";

const sizes = {
  xs: "text-xs font-light",
  lg: "text-[32px] font-light md:text-3xl sm:text-[28px]",
  s: "text-base font-light",
  md: "text-xl font-light",
};

const Text = ({ children, className = "", as, size = "s", ...restProps }) => {
  const Component = as || "p";

  return (
    <Component className={`text-white-A700 font-titilliumweb ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Text };
