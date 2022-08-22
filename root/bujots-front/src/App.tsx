import { useState } from 'react';
import { BrowserRouter } from "react-router-dom";
import AnimatedRoute from './components/AnimatedRoutes';
import PostContext, { IPage, emptyPage } from './contexts/PageContext';

function App() {
  const [page, setPage] = useState<IPage>(emptyPage);

  return (
    <PostContext.Provider value={{ page, setPage }}>
      <BrowserRouter>
        <AnimatedRoute></AnimatedRoute>
      </BrowserRouter>
    </PostContext.Provider>
  );
}

export default App;
