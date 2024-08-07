import Home from './pages/home'
import Artists from './pages/artists'
import Albums from './pages/albums'
import SearchHeader from './components/SearchHeader'
import { ROUTES } from './utils/paths'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.style.scss';

function App() {
  return (
    <>
      <BrowserRouter>
      <SearchHeader />
        <Routes>
          <Route path={ROUTES.HOME} >
            <Route index element={<Home />} />
            <Route path={ROUTES.ARTISTS} element={<Artists />} />
            <Route path={ROUTES.ALBUMS} element={<Albums />} />
            {/* TODO: Add proper 404 page */}
            <Route path="*" element={<Home />} />
            </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
