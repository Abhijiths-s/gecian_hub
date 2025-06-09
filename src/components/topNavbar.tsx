"use client";

import { User } from "iconsax-react";
import React from "react";

const Header: React.FC<{
  userName: string;
  semester: number;
  department: string;
}> = ({ userName, semester, department }) => {
  return (
    <div className="flex items-center justify-between px-4 py-7 bg-gradient-to-b from-transparent to-20% to-[var(--main)] shadow-[0_8px_20px_10px_var(--main)]">
      {/* User Name */}
      <div className="flex flex-col">
        <p className="truncate text-2xl text-foreground">
          Hello, <span className="font-bold">{userName || "Guest"}</span>
        </p>
        <p className="truncate text-md text-foreground">
          {semester && "S" + String(semester) + ","} {department || "CSE"}
        </p>
      </div>

      {/* User Icon */}
      <button
        type="button"
        className="flex size-10 items-center justify-center rounded-full bg-gray-600 transition-colors hover:bg-purple-300 dark:bg-purple-800 dark:hover:bg-purple-700"
        title="User Profile"
        onClick={() => console.warn("Profile Clicked")} // Changed to warn
        aria-label="Open user profile"
      >
        <User size="28" color="white" variant="Linear" />
      </button>
    </div>
  );
};

export default Header;
