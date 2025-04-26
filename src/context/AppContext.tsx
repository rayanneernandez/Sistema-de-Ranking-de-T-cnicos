import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { AppState, DateRange, SortMetric, Technician } from '../types';
import { initialTechnicians } from '../data/initialData';
import { v4 as uuidv4 } from 'uuid';

interface AppContextType extends AppState {
  addTechnician: (technician: Omit<Technician, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTechnician: (technician: Technician) => void;
  deleteTechnician: (id: string) => void;
  updateDateRange: (range: DateRange | null) => void;
  updateSortMetric: (metric: SortMetric) => void;
  updateSearchQuery: (query: string) => void;
  getRankedTechnicians: () => Technician[];
}

const defaultContextValue: AppContextType = {
  technicians: [],
  dateRange: null,
  sortBy: 'totalCalls',
  searchQuery: '',
  addTechnician: () => {},
  updateTechnician: () => {},
  deleteTechnician: () => {},
  updateDateRange: () => {},
  updateSortMetric: () => {},
  updateSearchQuery: () => {},
  getRankedTechnicians: () => [],
};

const AppContext = createContext<AppContextType>(defaultContextValue);

export const useAppContext = () => useContext(AppContext);

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [technicians, setTechnicians] = useState<Technician[]>(() => {
    const saved = localStorage.getItem('technicians');
    return saved ? JSON.parse(saved) : initialTechnicians;
  });
  
  const [dateRange, setDateRange] = useState<DateRange | null>(null);
  const [sortBy, setSortBy] = useState<SortMetric>('totalCalls');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('technicians', JSON.stringify(technicians));
  }, [technicians]);

  const addTechnician = (technicianData: Omit<Technician, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTechnician: Technician = {
      ...technicianData,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTechnicians([...technicians, newTechnician]);
  };

  const updateTechnician = (updatedTechnician: Technician) => {
    setTechnicians(
      technicians.map((tech) => 
        tech.id === updatedTechnician.id 
          ? { ...updatedTechnician, updatedAt: new Date().toISOString() } 
          : tech
      )
    );
  };

  const deleteTechnician = (id: string) => {
    setTechnicians(technicians.filter((tech) => tech.id !== id));
  };

  const updateDateRange = (range: DateRange | null) => {
    setDateRange(range);
  };

  const updateSortMetric = (metric: SortMetric) => {
    setSortBy(metric);
  };

  const updateSearchQuery = (query: string) => {
    setSearchQuery(query);
  };

  const getRankedTechnicians = () => {
    let filteredTechnicians = technicians;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredTechnicians = filteredTechnicians.filter(tech => 
        tech.name.toLowerCase().includes(query)
      );
    }

    return [...filteredTechnicians].sort((a, b) => {
      if (sortBy === 'totalCalls') {
        return b.totalCalls - a.totalCalls;
      } else if (sortBy === 'avgServiceTime') {
        return a.avgServiceTime - b.avgServiceTime;
      } else if (sortBy === 'firstResponseTime') {
        return a.firstResponseTime - b.firstResponseTime;
      } else {
        return b.rating - a.rating;
      }
    });
  };

  const contextValue: AppContextType = {
    technicians,
    dateRange,
    sortBy,
    searchQuery,
    addTechnician,
    updateTechnician,
    deleteTechnician,
    updateDateRange,
    updateSortMetric,
    updateSearchQuery,
    getRankedTechnicians,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};