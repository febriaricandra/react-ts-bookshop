import { Outlet } from 'react-router-dom';

function AuthLayout() {
  return (
    <div className='bg-gray-800 min-h-screen flex flex-col'>
        <main className='flex-grow flex justify-center items-center'>
            <Outlet />
        </main>
    </div>
  )
}

export default AuthLayout