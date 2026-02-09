import { Outlet, Link, useLocation } from 'react-router-dom';

export default function Layout() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100">
      <header className="px-6 py-3 border-b border-slate-700 bg-slate-800 flex gap-6 items-center">
        <Link to="/" className="font-bold text-slate-100 no-underline text-lg hover:text-slate-200">
          all-inone
        </Link>
        <nav className="flex gap-1">
          <Link
            to="/"
            className={`px-3 py-2 rounded-lg text-sm no-underline ${
              isHome ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            홈
          </Link>
        </nav>
      </header>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
