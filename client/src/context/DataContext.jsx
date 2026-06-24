import React, { createContext, useState, useEffect, useContext } from 'react';
import { api } from '../services/api';

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchContent = async () => {
    try {
      setIsLoading(true);
      const res = await api.getAllContent();
      setPortfolioData(res.data);
      setError(null);
    } catch (err) {
      console.error('Failed to load portfolio content', err);
      setError('Failed to load content. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  // Expose fetchContent to allow the admin panel to trigger a global refresh after editing
  return (
    <DataContext.Provider value={{ portfolioData, isLoading, error, refreshData: fetchContent }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);