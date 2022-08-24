import { useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import AnimatedRoute from './components/AnimatedRoutes';
import PostContext, { IPage, emptyPage } from './contexts/PageContext';
import AllPagesContext from './contexts/AllPagesContext';

function App() {
  const [page, setPage] = useState<IPage>(emptyPage);
  const [allPages, setAllPages] = useState<IPage[]>([]);

  return (
    <AllPagesContext.Provider value={{ allPages, setAllPages }}>
      <PostContext.Provider value={{ page, setPage }}>
        <BrowserRouter>
          <AnimatedRoute />
        </BrowserRouter>
      </PostContext.Provider>
    </AllPagesContext.Provider>
  );
}

export default App;
