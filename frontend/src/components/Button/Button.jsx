import React from "react"
import { Button as ShadButton } from "@/components/ui/button"

const Button = ({
  label,
  onClick,
  type = "button",
  className = "",
  variant = "default",
  size = "default",
  ...props
}) => {
  return (
    <ShadButton
      type={type}
      onClick={onClick}
      variant={variant}
      size={size}
      className={`w-full cursor-pointer ${className}`}
      {...props}
    >
      {label}
    </ShadButton>
  )
}

export default Button;