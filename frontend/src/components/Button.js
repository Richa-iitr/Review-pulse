"use client";
const Button = ({ className, children, action }) => {
  return (
    <button className={className} onClick={action}>
      {children}
    </button>
  );
};

export default Button;
