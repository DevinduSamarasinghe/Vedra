import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MdOutlineCancel,MdPendingActions } from 'react-icons/md';
import {TbTruckDelivery,TbBrandGoogleAnalytics} from 'react-icons/tb';
import { GiConfirmed } from 'react-icons/gi';
import { MdOutlineInventory2 } from 'react-icons/md';
import { AiOutlineHome } from 'react-icons/ai';
import { TbReportAnalytics } from 'react-icons/tb';
import { AiOutlineComment } from "react-icons/ai";
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { useStateContext } from '../../../../src/contexts/ContextProvider';

const SellerSidebar = () => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } =
    useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink =
    'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2';
  const normalLink =
    'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2 transition duration-300 ease-in-out';

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
          <Link
              to="/"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <img
                className="logo" style={{marginLeft: "40px"}}
                src="https://firebasestorage.googleapis.com/v0/b/vedra-8d493.appspot.com/o/C.png?alt=media&token=e4428da2-88c5-4e72-92b9-589c18f95334"
                alt=""
            />
            </Link>

            <TooltipComponent content="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>

          <div className="mt-10 ">
            {/*  menu ---------------------------------------------------------------------------------- menu  */}

            {/*  links ---------------------------------------------------------------------------------- links  */}
            <NavLink
              to="/seller"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : '',
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <AiOutlineHome /> {/*  icon  */}
              <span className="capitalize ">Overview</span> {/*  link name  */}
            </NavLink>

            <NavLink
              to="/itemmanagement"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : '',
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <MdOutlineInventory2 /> {/*  icon  */}
              <span className="capitalize ">Item Management</span> {/*  link name  */}
            </NavLink>

            <NavLink
              to="/"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : '',
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <AiOutlineComment /> {/*  icon  */}
              <span className="capitalize ">Messages</span> {/*  link name  */}
            </NavLink>

            {/*  links ---------------------------------------------------------------------------------- links  */}

            <NavLink
              to="/"
              onClick={handleCloseSideBar}
              style={({ isActive }) => ({
                backgroundColor: isActive ? currentColor : '',
              })}
              className={({ isActive }) => (isActive ? activeLink : normalLink)}
            >
              <TbReportAnalytics /> {/*  icon  */}
              <span className="capitalize ">Reports</span>{' '}
              {/*  link name  */}
            </NavLink>

          

            {/*  menu ---------------------------------------------------------------------------------- menu  */}


            {/*  links ---------------------------------------------------------------------------------- links  */}

            

          


          </div>
        </>
      )}
    </div>
  );
};

export default SellerSidebar;