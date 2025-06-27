"use client";

import { User } from "iconsax-react";
import React from "react";
import { useRouter } from "next/navigation";

function isValidSemester(semester: number) {
  return semester >= 1 && semester <= 8 && Number.isInteger(semester);
}

const Header: React.FC<{
  userName?: string | null;
  semester?: number | null;
  department?: string | null;
  userPhotoURL?: string | null;
}> = ({ userName, semester, department, userPhotoURL }) => {
  const router = useRouter();
  const displaySemester =
    semester !== undefined && semester !== null && isValidSemester(semester)
      ? `S${semester}, `
      : "";
     const handleUsrProfileClick = () => {
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-between px-4 py-7 bg-gradient-to-b from-transparent to-20% to-[var(--main)] shadow-[0_8px_20px_10px_var(--main)]">
      <div className="flex max-w-[var(--max-screen-size)] w-full justify-between mx-auto">
        {/* User Name */}
        <div className="flex flex-col">
          <p className="truncate text-2xl text-foreground">
            Hello, <span className="font-bold">{userName || "Guest"}</span>
          </p>
          <p className="truncate text-md text-foreground">
            {displaySemester}
            {department && department}
          </p>
        </div>

        {/* User Image or Icon */}
        <button
          type="button"
          className="flex size-10 items-center justify-center rounded-full overflow-hidden bg-gray-600 transition-colors hover:bg-purple-300 dark:bg-purple-800 dark:hover:bg-purple-700"
          title="User Profile"
          aria-label="Open user profile"
          onClick={() => handleUsrProfileClick()}
        >
          {userPhotoURL ? (
            <img
              src={userPhotoURL}
              alt="User Profile"
              className="object-cover w-full h-full"
            />
          ) : (
            <User size="28" color="white" variant="Linear" />
          )}
          
        </button>
      </div>
    </div>
  );
};

export default Header;
