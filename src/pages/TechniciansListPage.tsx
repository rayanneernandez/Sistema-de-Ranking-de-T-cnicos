import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import TechnicianCard from '../components/Technicians/TechnicianCard';
import { Plus, Search } from 'lucide-react';

const TechniciansListPage: React.FC = () => {
  const { getRankedTechnicians, updateSearchQuery, searchQuery } = useAppContext();
  
  const technicians = getRankedTechnicians();
  
  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Técnicos</h1>
          <p className="text-gray-400">Gerencie e visualize todos os técnicos</p>
        </div>
        
        <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="pl-10 pr-4 py-2 w-full bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
              placeholder="Buscar técnicos..."
              value={searchQuery}
              onChange={(e) => updateSearchQuery(e.target.value)}
            />
          </div>
          
          <Link
            to="/technicians/new"
            className="inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 whitespace-nowrap"
          >
            <Plus className="h-5 w-5 mr-1" />
            Adicionar Técnico
          </Link>
        </div>
      </div>
      
      {technicians.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technicians.map((technician, index) => (
            <TechnicianCard 
              key={technician.id} 
              technician={technician} 
              rank={index + 1} 
            />
          ))}
        </div>
      ) : (
        <div className="bg-gray-800 shadow rounded-lg p-8 text-center">
          <h3 className="text-lg font-medium text-white mb-2">Nenhum técnico encontrado</h3>
          <p className="text-gray-400 mb-4">
            {searchQuery 
              ? 'Nenhum técnico corresponde aos critérios de busca.' 
              : 'Comece adicionando seu primeiro técnico.'}
          </p>
          {!searchQuery && (
            <Link
              to="/technicians/new"
              className="inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Plus className="h-5 w-5 mr-1" />
              Adicionar Técnico
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default TechniciansListPage;