import { Outlet } from 'react-router-dom';
import NavAdmin from '../headers/NavAdmin';
import Navlist from '../sidebars/Navlist';

function AdminLayout() {

  const onToggleSidebar = () => {
    const sidebar = document.getElementById('default-sidebar');
    if (sidebar) {
      sidebar.classList.toggle('-translate-x-full');
    }
  }

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col">
      <NavAdmin onToggleSidebar={onToggleSidebar} />
      <main className="bg-gray-900 w-full z-0 relative">

        <aside id="default-sidebar" className="absolute top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
          <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
            <Navlist />
          </div>
        </aside>

        <div className="p-4 sm:ml-64 min-h-screen">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
