import React from "react";

const Header = ({ children }) => {
  return (
    <div className="flex items-center gap-3 justify-center">
      <div className="flex items-center justify-center gap-1">
        <div className="w-10 h-[1px] bg-gradient-to-r from-transparent to-[var(--purple-color)]" />
        <div className="h-1 aspect-square rounded-full bg-[var(--purple-color)]" />
      </div>

      <p className="text-center font-bold text-xl mb-0.5 bg-gradient-to-r from-[var(--purple-color)] to-[var(--blue-color)] bg-clip-text text-transparent">
        {children}
      </p>

      <div className="flex items-center justify-center gap-1">
        <div className="h-1 aspect-square rounded-full bg-[var(--blue-color)]" />
        <div className="w-10 h-[1px] bg-gradient-to-r from-[var(--blue-color)] to-transparent" />
      </div>
    </div>
  );
};

export default Header;
