import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getCurrentMatches,
  searchCurrentMatches,
} from "../services/MatchDataService";

import type { CricbuzzMatchItem } from "../components/types/Matches";

interface DashboardSearchContextType {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;

  matches: CricbuzzMatchItem[];
  loading: boolean;

  loadMatches: () => Promise<void>;
}

const DashboardSearchContext =
  createContext<DashboardSearchContextType | null>(null);

export const DashboardSearchProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const [searchTerm, setSearchTerm] = useState("");
  const [matches, setMatches] = useState<CricbuzzMatchItem[]>([]);
  const [loading, setLoading] = useState(false);

  const loadMatches = async () => {

    setLoading(true);

    try {

      const response =
        searchTerm.trim() === ""
          ? await getCurrentMatches()
          : await searchCurrentMatches(searchTerm);

      setMatches(response.matches);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    const timer = setTimeout(loadMatches, 500);

    return () => clearTimeout(timer);

  }, [searchTerm]);

  return (
    <DashboardSearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        matches,
        loading,
        loadMatches,
      }}
    >
      {children}
    </DashboardSearchContext.Provider>
  );
};

export const useDashboardSearch = () => {

  const context = useContext(DashboardSearchContext);

  if (!context) {
    throw new Error(
      "useDashboardSearch must be used inside DashboardSearchProvider"
    );
  }

  return context;
};