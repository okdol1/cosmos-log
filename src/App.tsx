import { Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import About from "./pages/About";
import PostDetail from "./pages/PostDetail";
import BookPage from "./pages/Book";
import BookDetail from "./pages/BookDetail";
import Playlist from "./pages/Playlist";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <HelmetProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blog" element={<Blog />} />
          <Route path="about" element={<About />} />
          <Route path="post/:id" element={<PostDetail />} />
          <Route path="book" element={<BookPage />} />
          <Route path="book/:id" element={<BookDetail />} />
          <Route path="playlist" element={<Playlist />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HelmetProvider>
  );
}

export default App;
