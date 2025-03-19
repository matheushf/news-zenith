import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Menu, User, X } from 'lucide-react';
import { cn } from '@/utils/utils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Preferences', href: '/preferences', icon: User },
  ];
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header 
      className={cn(
        "fixed left-0 top-0 z-50 w-full transition-all duration-300 ease-apple",
        isScrolled && "bg-background/80 backdrop-blur-lg shadow-sm",
        !isScrolled && "bg-transparent"
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link 
          to="/" 
          className="flex items-center text-xl font-medium"
        >
          <span className="text-primary">News</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {navigation.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    "navigation-link",
                    isActive(item.href) && "active"
                  )}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Mobile Menu Button */}
        <button
          className="block md:hidden"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu className="h-6 w-6" />
        </button>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 z-50 flex flex-col bg-background/95 p-4 backdrop-blur-lg animate-fade-in"
          >
            <div className="flex justify-end">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-full p-2 text-muted-foreground hover:bg-secondary"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <nav className="flex flex-1 flex-col items-center justify-center">
              <ul className="space-y-6 text-center">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className="flex flex-col items-center space-y-1"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Icon className="h-6 w-6" />
                        <span className="text-lg font-medium">{item.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
