
import { FC, ReactNode } from 'react';
import Header from './Header';
import { ScrollArea } from '@/components/ui/scroll-area';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <ScrollArea className="flex-1">
        <main className="flex-1">
          {children}
        </main>
      </ScrollArea>
    </div>
  );
};

export default Layout;
