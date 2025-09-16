import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Header } from '../Header/Header';
import { Sidebar } from '../Sidebar/Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex">
        <Sidebar />
        
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          
          <main className="flex-1 overflow-auto">
            <div className="h-full p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};