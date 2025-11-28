import axios from "axios";
import clsx from "clsx";
import { ArrowUpDown, SlidersHorizontal, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BookCard from "../components/BookCard";
import Filters from "../components/Filters";
import type { Book } from "../utils/types";

export const sampleBooks: Book[] = [
  {
    id: "b1",
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    isbn: "9780262033848",
    publishedOn: "2009-07-31",
    publisher: "MIT Press",
    genre: "Computer Science",
    price: 75,
    language: "English",
    pages: 1312,
    description: "Comprehensive guide to modern algorithm design and analysis.",
    coverUrl: "https://example.com/covers/intro-to-algorithms.jpg",
    department: "Computer Science",
    age: 12,
    copies: 10,
    learnings: ["Algorithm Design", "Data Structures", "Complexity Analysis"],
    skills: ["Problem Solving", "Programming", "Critical Thinking"],
  },
  {
    id: "b2",
    title: "Clean Code",
    author: "Robert C. Martin",
    isbn: "9780132350884",
    publishedOn: "2008-08-01",
    publisher: "Prentice Hall",
    genre: "Software Engineering",
    price: 45,
    language: "English",
    pages: 464,
    description: "A handbook of agile software craftsmanship.",
    coverUrl: "https://example.com/covers/clean-code.jpg",
    department: "Computer Science",
    age: 15,
    copies: 8,
    learnings: ["Code Quality", "Refactoring", "Testing"],
    skills: ["Programming Best Practices", "Debugging", "Design Patterns"],
  },
  {
    id: "b3",
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt, David Thomas",
    isbn: "9780201616224",
    publishedOn: "1999-10-30",
    publisher: "Addison-Wesley",
    genre: "Software Development",
    price: 50,
    language: "English",
    pages: 352,
    description: "Tips and best practices for modern software development.",
    coverUrl: "https://example.com/covers/pragmatic-programmer.jpg",
    department: "Computer Science",
    age: 20,
    copies: 12,
    learnings: ["Best Practices", "Debugging", "Software Design"],
    skills: ["Problem Solving", "Code Maintenance", "Team Collaboration"],
  },
  {
    id: "b4",
    title: "Design Patterns: Elements of Reusable Object-Oriented Software",
    author: "Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides",
    isbn: "9780201633610",
    publishedOn: "1994-10-31",
    publisher: "Addison-Wesley",
    genre: "Software Engineering",
    price: 60,
    language: "English",
    pages: 395,
    description:
      "Classic book introducing 23 design patterns in software development.",
    coverUrl: "https://example.com/covers/design-patterns.jpg",
    department: "Computer Science",
    age: 28,
    copies: 7,
    learnings: ["Design Patterns", "OOP Principles", "Reusable Code"],
    skills: ["Software Architecture", "Refactoring", "Problem Solving"],
  },
  {
    id: "b5",
    title: "Artificial Intelligence: A Modern Approach",
    author: "Stuart Russell, Peter Norvig",
    isbn: "9780136042594",
    publishedOn: "2010-12-11",
    publisher: "Pearson",
    genre: "Artificial Intelligence",
    price: 90,
    language: "English",
    pages: 1152,
    description: "Comprehensive introduction to AI concepts and algorithms.",
    coverUrl: "https://example.com/covers/ai-modern-approach.jpg",
    department: "Computer Science",
    age: 10,
    copies: 5,
    learnings: ["Machine Learning", "Search Algorithms", "AI Planning"],
    skills: ["AI Modeling", "Problem Solving", "Programming"],
  },
];

const SearchLayout = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");

  const [isOpen, setOpenFilters] = useState(false);
  const [matchedBooks, setMatchedBooks] = useState<Book[]>(sampleBooks);
  const [unmatchedBooks, setUnmatchedBooks] = useState<Book[]>([]);
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [filteredMatchedBooks, setFilteredMatchedBooks] = useState<Book[]>([]);
  const [filteredUnmatchedBooks, setFilteredUnmatchedBooks] = useState<Book[]>(
    []
  );
  const [loading, setLoading] = useState(true); // ✅ loading state

  const filterKeyToBookFieldMap: Record<string, keyof Book> = {
    author: "author",
    language: "language",
    genre: "genre",
    branch: "department",
  };

  const handleFiltersUpdate = (filter: Record<string, string[]>) => {
    setFilters(filter);
  };

  const toggle = () => {
    setSortOpen(false);
    setOpenFilters((prev) => !prev);
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/search") {
      const params = new URLSearchParams(location.search);
      if (!params.has("query")) {
        params.set("query", "");

        navigate(
          {
            pathname: location.pathname,
            search: params.toString(),
          },
          { replace: true }
        );
      }
    }

    setLoading(true); // ✅ Start loading
    axios
      .get(`http://localhost:8080/api/search?query=${query}`)
      .then((res) => {
        if (
          res.status === 200 &&
          Array.isArray(res.data) &&
          res.data.length > 0
        ) {
          const result = res.data[0];
          setMatchedBooks(result.matched || []);
          setUnmatchedBooks(result.unmatched || []);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false)); // ✅ Stop loading
  }, [query]);

  const passesAllFilters = (book: Book): boolean => {
    return Object.entries(filters).every(([filterKey, filterValues]) => {
      if (!filterValues || filterValues.length === 0) return true;

      const bookField = filterKeyToBookFieldMap[filterKey];
      if (!bookField) return true;

      const bookValue = book[bookField];
      return filterValues.some((val) =>
        String(bookValue).toLowerCase().includes(val.toLowerCase())
      );
    });
  };

  useEffect(() => {
    setFilteredMatchedBooks(matchedBooks.filter(passesAllFilters));
    setFilteredUnmatchedBooks(unmatchedBooks.filter(passesAllFilters));
  }, [filters, matchedBooks, unmatchedBooks]);

  const [sortOpen, setSortOpen] = useState<boolean>(false);

  const toggleSortOpen = () => {
    setOpenFilters(false);
    setSortOpen((prev) => !prev);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row w-full h-full overflow-x-hidden py-6">
      <aside className="flex relative ">
        <Filters
          onFilterChange={handleFiltersUpdate}
          isOpen={isOpen}
          toggle={toggle}
        />

        <aside
          className={clsx(
            "fixed md:absolute top-0 left-0 h-full w-[280px] bg-gradient-to-b from-white via-gray-50 to-gray-100",
            "flex flex-col border-t border-r border-gray-200 z-[200] overflow-y-auto",
            "transition-transform duration-500 ease-in-out backdrop-blur-md z-100",
            sortOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <button
            onClick={toggleSortOpen}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 active:scale-95 transition-all duration-200"
            aria-label="Close Menu"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>

          <div className="flex flex-col gap-6 mt-20 px-5 pb-6 h-full">
            <h2 className="text-2xl font-extrabold text-gray-800 tracking-wide border-b pb-2 border-gray-300">
              Sort by
            </h2>
          </div>
        </aside>
      </aside>

      <main
        className={clsx(
          "flex-1 flex flex-col transition-all duration-500 ease-in-out px-4 md:px-6",
          isOpen || sortOpen ? "md:ml-[280px]" : "md:ml-0"
        )}
      >
        <header className="flex flex-row items-center justify-between gap-4 md:gap-0 w-full">
          {query && (
            <h2 className="text-sm lg:text-2xl font-bold text-gray-900 tracking-tight w-full md:w-auto">
              Results for{" "}
              <span className="text-blue-600 truncate">"{query}"</span>
            </h2>
          )}

          <div className="flex items-center w-fit gap-2 justify-end">
            <button
              onClick={toggleSortOpen}
              className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 font-semibold rounded-full text-sm transition-all duration-300 hover:bg-blue-600 hover:text-white active:scale-95"
            >
              <ArrowUpDown className="w-3 h-3 md:w-5 md:h-5" />
              <span className="hidden md:block">Sort</span>
            </button>

            <button
              onClick={toggle}
              className="flex items-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 font-semibold rounded-full text-sm transition-all duration-300 hover:bg-blue-600 hover:text-white active:scale-95"
            >
              <SlidersHorizontal className="w-3 h-3 md:w-5 md:h-5" />
              <span className="hidden md:block">Filter</span>
            </button>
          </div>
        </header>

        <section className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
          {[...filteredMatchedBooks, ...filteredUnmatchedBooks].map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              imageUrl={book.coverUrl}
              title={book.title}
              author={book.author}
              rating={4.5}
              reviews={93}
              level="Intermediate"
              pages={book.pages}
            />
          ))}
        </section>
      </main>
    </div>
  );
};

export default SearchLayout;
