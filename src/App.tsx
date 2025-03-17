import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useNewsStore } from '@/store/useNewsStore';
import HomePage from '@/pages/HomePage/HomePage';
import MyFeedPage from '@/pages/MyFeedPage/MyFeedPage';
import ArticlePage from '@/pages/ArticlePage/ArticlePage';
import Layout from '@/components/Layout';

const queryClient = new QueryClient();

function App() {
  const initializeStore = useNewsStore(state => state.initializeStore);
  
  useEffect(() => {
    initializeStore();
  }, [initializeStore]);
  
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/my-feed" element={<MyFeedPage />} />
            <Route path="/article/:id" element={<ArticlePage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
