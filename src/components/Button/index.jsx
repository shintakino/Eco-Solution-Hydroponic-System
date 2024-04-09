import React from "react";
import PropTypes from "prop-types";

const shapes = {
  square: "rounded-[0px]",
  round: "rounded-[20px]",
};
const variants = {
  fill: {
    blue_A200: "bg-blue-A200 text-white-A700",
    amber_600: "bg-amber-600 text-white-A700",
    teal_400: "bg-teal-400 shadow-bs text-white-A700",
    red_800: "bg-red-800 text-white-A700",
    blue_gray_800: "bg-blue_gray-800 text-gray-400",
    green_A700: "bg-green-A700 text-white-A700",
    red_A200: "bg-red-A200 text-white-A700",
  },
  outline: {
    white_A700: "border-white-A700 border-l border-solid text-white-A700",
  },
};
const sizes = {
  "2xl": "h-[106px] px-[34px] text-[32px]",
  xs: "h-[44px] px-[35px] text-xs",
  sm: "h-[44px] px-[35px] text-[25px]",
  lg: "h-[58px] px-[35px] text-[32px]",
  md: "h-[58px] px-[29px] text-2xl",
  xl: "h-[106px] px-[35px] text-[40px]",
};

const Button = ({
  children,
  className = "",
  leftIcon,
  rightIcon,
  shape,
  variant = "fill",
  size = "xl",
  color = "blue_gray_800",
  ...restProps
}) => {
  return (
    <button
      className={`${className} flex items-center justify-center text-center cursor-pointer ${(shape && shapes[shape]) || ""} ${(size && sizes[size]) || ""} ${(variant && variants[variant]?.[color]) || ""}`}
      {...restProps}
    >
      {!!leftIcon && leftIcon}
      {children}
      {!!rightIcon && rightIcon}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  leftIcon: PropTypes.node,
  rightIcon: PropTypes.node,
  shape: PropTypes.oneOf(["square", "round"]),
  size: PropTypes.oneOf(["2xl", "xs", "sm", "lg", "md", "xl"]),
  variant: PropTypes.oneOf(["fill", "outline"]),
  color: PropTypes.oneOf([
    "blue_A200",
    "amber_600",
    "teal_400",
    "red_800",
    "blue_gray_800",
    "green_A700",
    "white_A700",
    "red_A200",
  ]),
};

export { Button };
