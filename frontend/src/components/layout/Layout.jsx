import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom'; 
import Sidebar from './Sidebar';
import PageLoader from '../loader/PageLoader';
import Header from './Header';
// import Footer from './Footer';

const Layout = () => {
  
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gray-50">
        <Header />
        <main className="p-4 ">
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </main>
        {/* <Footer /> */}
      </div>
    </div>
  );
};

export default Layout;