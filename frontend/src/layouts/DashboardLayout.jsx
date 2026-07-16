import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Sidebar from '../components/layout/Sidebar';

export default function DashboardLayout() {
  return (
    <div className="min-h-screen bg-cyber-darker">
      <Navbar />
      <Sidebar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pt-16 pl-[280px] min-h-screen"
      >
        <div className="p-6">
          <Outlet />
        </div>
      </motion.main>
    </div>
  );
}
