"use client";
import Link from "next/link";
import React from "react";
import { BsBarChartFill as PresentationChartBarIcon } from "react-icons/bs";
import { BsBagFill as ShoppingBagIcon } from "react-icons/bs";
import { BsPersonFill as UserCircleIcon } from "react-icons/bs";
import { BsGearFill as Cog6ToothIcon } from "react-icons/bs";
import { BsInboxFill as InboxIcon } from "react-icons/bs";
import { BsPower as PowerIcon } from "react-icons/bs";

interface SidebarProps {
  setPage: (page: string) => void;
}

const Sidebar = () => {
  return (
    <div className=" fixed  h-svh w-64  col-span-1 max-w-64 p-4 shadow-xl bg-white">
      <div className="mb-2 flex flex-col">
        <h5 className="text-blue-gray font-sans font-medium text-2xl text-blue-400  p-1">Instructor </h5>
        <p className=" border rounded-full p-1 w-max">Dashboard</p>
      </div>
      <div className="flex flex-col h-full py-4">
        <div className="grow">
          <ul>

          <Link href="/Instructor/Dashboard">
            <li className="flex items-center mb-2">
              <PresentationChartBarIcon className="h-5 w-5 mr-2" />
              Dashboard
            </li>
            </Link>

            <Link href="/Instructor/Dashboard/Quizzez">
              <li className="flex items-center mb-2">
                <ShoppingBagIcon className="h-5 w-5 mr-2" />
                Quizz
              </li>
            </Link>
            
            <Link href="/Instructor/Dashboard/Inbox">
            <li className="flex items-center mb-2">
              <InboxIcon className="h-5 w-5 mr-2" />
              Inbox
              <span className="bg-blue-gray-100 text-blue-gray-500 text-xs font-semibold ml-auto py-1 px-2 rounded-full">
                14
              </span>
            </li>
            </Link>
            <Link href="/Instructor/Dashboard/Profile">
            <li className="flex items-center mb-2">
              <UserCircleIcon className="h-5 w-5 mr-2" />
              Profile
            </li>
            </Link>
          </ul>
        </div>
        <div className=" py-24">
          <ul>
            <li className="flex items-center mb-2">
              <Cog6ToothIcon className="h-5 w-5 mr-2" />
              Settings
            </li>
            <li className="flex items-center">
              <PowerIcon className="h-5 w-5 mr-2" />
              Log Out
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
