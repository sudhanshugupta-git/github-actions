import { createContext, useContext, useState, useEffect } from "react";
import { getFilms } from "../services/filmService";

const FilmContext = createContext();

export const useFilmContext = () => useContext(FilmContext);

export const FilmProvider = ({ children }) => {
  const [films, setFilms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  const [filters, setFilters] = useState({});
  const [sortBy, setSortBy] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");

  const [views, setViews] = useState(() => {
    const saved = localStorage.getItem("filmViews");
    return saved ? JSON.parse(saved) : [];
  });
  const [activeView, setActiveView] = useState(null);

  // on change save views to localStorage
  useEffect(() => {
    localStorage.setItem("filmViews", JSON.stringify(views));
  }, [views]);

  const saveView = (name, filters, sortBy, sortOrder) => {
    const newView = { name, filters, sortBy, sortOrder };
    setViews((prev) => [...prev.filter((v) => v.name !== name), newView]);
  };

  const fetchFiles = async (
    page = currentPage,
    sortField = sortBy,
    order = sortOrder,
    filterParams = filters
  ) => {
    const res = await getFilms(page, 10, sortField, order, filterParams);
    // console.log(res.data);
    setFilms(res.data.data);
    setCurrentPage(res.data.currentPage);
    setTotalCount(res.data.totalCount); 
    setTotalPages(res.data.totalPages);
  };

  const runView = (view) => {
    setFilters(view.filters);
    setSortBy(view.sortBy);
    setSortOrder(view.sortOrder);
    setActiveView(view.name);
    fetchFiles(1, view.sortBy, view.sortOrder, view.filters);
  };

  return (
    <FilmContext.Provider
      value={{
        films,
        setFilms,
        filters,
        setFilters,
        sortBy,
        setSortBy,
        sortOrder,
        setSortOrder,
        views,
        setViews,
        activeView,
        setActiveView,
        fetchFiles,
        currentPage,
        totalPages,
        totalCount,
        saveView,
        runView,
      }}
    >
      {children}
    </FilmContext.Provider>
  );
};
