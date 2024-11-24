import { Outlet } from 'react-router-dom';

function CommonLayout() {
  return (
    <div>
      <header>Common User Header</header>
      <main>
        <Outlet />
      </main>
      <footer>Common User Footer</footer>
    </div>
  );
}

export default CommonLayout;