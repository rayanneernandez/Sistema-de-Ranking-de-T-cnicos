import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { format } from 'date-fns';
import { FileSpreadsheet, Save, X } from 'lucide-react';

const AddServiceRecordForm: React.FC = () => {
  const navigate = useNavigate();
  const { technicians, updateTechnician } = useAppContext();
  
  const [technicianId, setTechnicianId] = useState('');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [totalCalls, setTotalCalls] = useState('');
  const [avgServiceTime, setAvgServiceTime] = useState('');
  const [firstResponseTime, setFirstResponseTime] = useState('');
  const [rating, setRating] = useState('5');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (technicianId === '') {
      alert('Por favor, selecione um técnico');
      return;
    }
    
    const technician = technicians.find(tech => tech.id === technicianId);
    if (!technician) return;
    
    updateTechnician({
      ...technician,
      totalCalls: Number(totalCalls),
      avgServiceTime: Number(avgServiceTime),
      firstResponseTime: Number(firstResponseTime),
      rating: Number(rating),
      updatedAt: new Date().toISOString()
    });
    
    navigate('/');
  };
  
  return (
    <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-4 sm:p-6 border-b border-gray-700">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <FileSpreadsheet className="h-6 w-6 text-blue-400 mr-2" />
          Atualizar Métricas do Técnico
        </h2>
        <p className="mt-1 text-sm text-gray-400">
          Insira as métricas atualizadas do técnico
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="sm:col-span-2">
            <label htmlFor="technician" className="block text-sm font-medium text-gray-300 mb-1">
              Técnico *
            </label>
            <select
              id="technician"
              value={technicianId}
              onChange={(e) => setTechnicianId(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">-- Selecione o Técnico --</option>
              {technicians.map((tech) => (
                <option key={tech.id} value={tech.id}>
                  {tech.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-1">
              Data da Atualização *
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="totalCalls" className="block text-sm font-medium text-gray-300 mb-1">
              Total de Atendimentos *
            </label>
            <input
              type="number"
              id="totalCalls"
              min="0"
              value={totalCalls}
              onChange={(e) => setTotalCalls(e.target.value)}
              placeholder="Digite o total de atendimentos"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="avgServiceTime" className="block text-sm font-medium text-gray-300 mb-1">
              Tempo Médio de Atendimento (minutos) *
            </label>
            <input
              type="number"
              id="avgServiceTime"
              min="1"
              value={avgServiceTime}
              onChange={(e) => setAvgServiceTime(e.target.value)}
              placeholder="Digite o tempo médio em minutos"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="firstResponseTime" className="block text-sm font-medium text-gray-300 mb-1">
              Tempo Médio de Primeira Resposta (minutos) *
            </label>
            <input
              type="number"
              id="firstResponseTime"
              min="1"
              value={firstResponseTime}
              onChange={(e) => setFirstResponseTime(e.target.value)}
              placeholder="Digite o tempo médio em minutos"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          
          <div>
            <label htmlFor="rating" className="block text-sm font-medium text-gray-300 mb-1">
              Avaliação Média (1-5) *
            </label>
            <select
              id="rating"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 text-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="1">1 - Ruim</option>
              <option value="2">2 - Regular</option>
              <option value="3">3 - Bom</option>
              <option value="4">4 - Muito Bom</option>
              <option value="5">5 - Excelente</option>
            </select>
          </div>
        </div>
        
        <div className="mt-6 flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex justify-center items-center px-4 py-2 border border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            <X className="h-4 w-4 mr-1" />
            Cancelar
          </button>
          <button
            type="submit"
            className="inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Save className="h-4 w-4 mr-1" />
            Salvar Métricas
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddServiceRecordForm;