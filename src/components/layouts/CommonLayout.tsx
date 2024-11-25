import { Outlet } from 'react-router-dom';
import Navbar from '../headers/Navbar';

function CommonLayout() {
  return (
    <div className='bg-gray-800 min-h-screen flex flex-col'>
      <header>
        <Navbar />
      </header>
      <main className='max-w-screen-xl mx-auto'>
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
}

export default CommonLayout;