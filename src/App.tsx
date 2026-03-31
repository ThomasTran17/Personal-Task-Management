import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar, BottomNav, Toaster } from '@/components';
import { ListPage, StatisticsPage } from '@/pages';
import { usePeriodicDeadlineCheck } from '@/hooks';

const navItems = [
  {
    href: '/',
    label: 'List',
    iconType: 'kanban' as const,
  },
  {
    href: '/statistics',
    label: 'Statistics',
    iconType: 'stats' as const,
  },
];

export default function App() {
  // Setup deadline notifications that persist across page refreshes
  usePeriodicDeadlineCheck();

  return (
    <Router>
      <div className="flex h-screen">
        <Sidebar items={navItems} />
        <main className="flex-1 overflow-auto pb-24 lg:pb-0">
          <Routes>
            <Route path="/" element={<ListPage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
          </Routes>
        </main>
        <BottomNav items={navItems} />
      </div>
      <Toaster />
    </Router>
  );
}
