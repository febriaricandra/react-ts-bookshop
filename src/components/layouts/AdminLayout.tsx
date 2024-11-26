import { Outlet } from 'react-router-dom';
import NavDashboard from '../headers/NavDashboard';

function AdminLayout() {
  return (
    <div className='bg-gray-800 min-h-screen flex flex-col'>
      <NavDashboard />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;