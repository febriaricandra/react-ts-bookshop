import { Outlet } from 'react-router-dom';

function AuthLayout() {
  return (
    <div className='bg-gray-800 min-h-screen flex flex-col'>
        <header>Auth Header</header>
        <main className='flex-grow flex justify-center items-center'>
            <Outlet />
        </main>
        <footer>Auth Footer</footer>
    </div>
  )
}

export default AuthLayout