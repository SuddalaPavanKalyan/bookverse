export interface FAQ {
  question: string;
  answer: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  publishedOn: string;
  publisher: string;
  genre: string;
  price: number;
  language: string;
  pages: number;
  description: string;
  coverUrl: string;
  department: string;
  age: number;
  copies: number;
  learnings: string[];
  skills: string[];
}

export interface SearchResultResponse {
  matched: Book[];
  unmatched: Book[];
}

export interface Review {
  comment: string;
  rating: number;
}

export interface BookWithFAQs {
  book: Book;
  faqs: FAQ[];
  reviews: Review[];
}

import axios from "axios";
import { useEffect, useState } from "react";

const baseUrl = "http://localhost:8080/api/catalog/utils";

export function useAuthors() {
  const [authors, setAuthors] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseUrl}/authors`);
        if (response.status === 200 && Array.isArray(response.data)) {
          const sorted = response.data
            .map((name: string) => name.trim())
            .sort((a, b) => a.localeCompare(b)); // alphabetical sort
          setAuthors(sorted);
        }
      } catch (err) {
        console.error("Failed to fetch authors:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  return { authors, loading };
}

export function useGenres() {
  const [genres, setGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseUrl}/genres`);
        if (response.status === 200 && Array.isArray(response.data)) {
          const sorted = response.data
            .map((name: string) => name.trim())
            .sort((a, b) => a.localeCompare(b)); // alphabetical sort
          setGenres(sorted);
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  return { genres, loading };
}

export function useLanguages() {
  const [languages, setLanguages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseUrl}/languages`);
        if (response.status === 200 && Array.isArray(response.data)) {
          const sorted = response.data
            .map((name: string) => name.trim())
            .sort((a, b) => a.localeCompare(b)); // alphabetical sort
          setLanguages(sorted);
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchLanguages();
  }, []);

  return { languages, loading };
}

export function useBranches() {
  const [branches, setBranches] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${baseUrl}/branches`);
        if (response.status === 200 && Array.isArray(response.data)) {
          const sorted = response.data
            .map((name: string) => name.trim())
            .sort((a, b) => a.localeCompare(b)); // alphabetical sort
          setBranches(sorted);
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    fetchBranches();
  }, []);

  return { branches, loading };
}

// export function useTokens() {
//   const [tokens, setTokens] = useState<string[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchTokens = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(`${baseUrl}/tokens`);
//         if (response.status === 200) {
//           setTokens(response.data);
//         }
//       } catch (err) {
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTokens();
//   }, []);

//   return { tokens, loading };
// }
