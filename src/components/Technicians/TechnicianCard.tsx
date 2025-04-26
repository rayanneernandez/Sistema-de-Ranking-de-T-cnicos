import React from 'react';
import { Link } from 'react-router-dom';
import { User, Star, Clock, CheckCircle, Edit } from 'lucide-react';
import { Technician } from '../../types';

interface TechnicianCardProps {
  technician: Technician;
  rank: number;
}

const TechnicianCard: React.FC<TechnicianCardProps> = ({ technician, rank }) => {
  const formatMinutes = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes.toFixed(0)} min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = Math.round(minutes % 60);
    return `${hours}h ${mins}m`;
  };
  
  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    return (
      <div className="flex items-center">
        <span className="mr-1 font-semibold">{rating.toFixed(1)}</span>
        <div className="flex text-yellow-400">
          {[...Array(fullStars)].map((_, i) => (
            <Star key={`full-${i}`} className="h-4 w-4 fill-current" />
          ))}
          {hasHalfStar && (
            <div className="relative">
              <Star className="h-4 w-4 text-gray-300" />
              <div className="absolute top-0 left-0 overflow-hidden w-1/2">
                <Star className="h-4 w-4 fill-current text-yellow-400" />
              </div>
            </div>
          )}
          {[...Array(emptyStars)].map((_, i) => (
            <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
          ))}
        </div>
      </div>
    );
  };
  
  const getRankBadgeColor = () => {
    if (rank === 1) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    if (rank === 2) return 'bg-gray-100 text-gray-800 border-gray-200';
    if (rank === 3) return 'bg-amber-100 text-amber-800 border-amber-200';
    return 'bg-blue-50 text-blue-800 border-blue-100';
  };
  
  return (
    <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:shadow-lg transform hover:-translate-y-1">
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        <div className="flex items-center">
          <div className="bg-blue-900 p-2 rounded-full mr-3">
            <User className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Técnico {rank}</h3>
            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getRankBadgeColor()}`}>
              Posição #{rank}
            </div>
          </div>
        </div>
        <Link 
          to={`/technicians/${technician.id}/edit`}
          className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
        >
          <Edit className="h-5 w-5" />
        </Link>
      </div>
      
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-start">
            <CheckCircle className="h-5 w-5 text-blue-400 mr-2 mt-0.5" />
            <div>
              <p className="text-sm text-gray-400">Total de Atendimentos</p>
              <p className="font-semibold text-white">{technician.totalCalls}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Clock className="h-5 w-5 text-emerald-400 mr-2 mt-0.5" />
            <div>
              <p className="text-sm text-gray-400">Tempo Médio</p>
              <p className="font-semibold text-white">{formatMinutes(technician.avgServiceTime)}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Clock className="h-5 w-5 text-amber-400 mr-2 mt-0.5" />
            <div>
              <p className="text-sm text-gray-400">Primeira Resposta</p>
              <p className="font-semibold text-white">{formatMinutes(technician.firstResponseTime)}</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <Star className="h-5 w-5 text-purple-400 mr-2 mt-0.5" />
            <div>
              <p className="text-sm text-gray-400">Avaliação</p>
              <div className="text-white">{renderRating(technician.rating)}</div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-700">
          <Link
            to={`/technicians/${technician.id}`}
            className="w-full inline-flex justify-center items-center px-4 py-2 border border-blue-500 text-sm font-medium rounded-md text-blue-400 bg-transparent hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Ver Detalhes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TechnicianCard;