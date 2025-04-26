import { Technician, ServiceRecord } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Initial technicians list - using numbered technicians
export const initialTechnicians: Technician[] = [
  {
    id: uuidv4(),
    name: 'Técnico 1',
    totalCalls: 0,
    avgServiceTime: 0,
    firstResponseTime: 0,
    rating: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Técnico 2',
    totalCalls: 0,
    avgServiceTime: 0,
    firstResponseTime: 0,
    rating: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Técnico 3',
    totalCalls: 0,
    avgServiceTime: 0,
    firstResponseTime: 0,
    rating: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Técnico 4',
    totalCalls: 0,
    avgServiceTime: 0,
    firstResponseTime: 0,
    rating: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Técnico 5',
    totalCalls: 0,
    avgServiceTime: 0,
    firstResponseTime: 0,
    rating: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Técnico 6',
    totalCalls: 0,
    avgServiceTime: 0,
    firstResponseTime: 0,
    rating: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: 'Técnico 7',
    totalCalls: 0,
    avgServiceTime: 0,
    firstResponseTime: 0,
    rating: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Sample service records - empty by default
export const initialServiceRecords: ServiceRecord[] = [];