import React, { createContext, useContext, useState, useCallback } from 'react';
import api from '../utils/api';
import { message } from 'antd';

export interface Mould {
  _id: string;
  clientId: string;
  productId: string;
  status: 'Pending' | 'In Machine' | 'Completed';
  percentage: number;
  startDate?: string;
  expectedCompletion?: string;
}

interface MouldContextType {
  moulds: Mould[];
  setMoulds: React.Dispatch<React.SetStateAction<Mould[]>>;
  updateMouldOptimistic: (id: string, updates: Partial<Mould>) => Promise<void>;
  fetchMoulds: () => Promise<void>;
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const MouldContext = createContext<MouldContextType | undefined>(undefined);

export const MouldProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [moulds, setMoulds] = useState<Mould[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMoulds = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/moulds');
      setMoulds(res.data);
    } catch (error) {
      console.error('Failed to fetch moulds', error);
      message.error('Failed to load moulds');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateMouldOptimistic = useCallback(async (id: string, updates: Partial<Mould>) => {
    // 1. Identify the mould
    const mouldIndex = moulds.findIndex(m => m._id === id);
    if (mouldIndex === -1) return;

    const originalMould = moulds[mouldIndex];
    let finalUpdates = { ...updates };

    // Logic: When status complete then make percentage 100
    if (finalUpdates.status === 'Completed') {
      finalUpdates.percentage = 100;
    }

    // Logic: When status was pending then unable to update the percentage
    // If we are trying to update percentage
    if (finalUpdates.percentage !== undefined) {
        const currentStatus = finalUpdates.status || originalMould.status;
        if (currentStatus === 'Pending') {
            message.warning("Cannot update percentage while status is Pending");
            return;
        }
    }

    // 2. Update local state immediately
    const updatedMoulds = [...moulds];
    const updatedMould = { ...originalMould, ...finalUpdates };
    updatedMoulds[mouldIndex] = updatedMould;
    setMoulds(updatedMoulds);

    // 3. API call in background
    try {
      await api.put(`/moulds/${id}`, finalUpdates);
    } catch (error) {
      console.error('Failed to update mould', error);
      message.error('Update failed. Rolling back.');
      // Rollback to the list we had before this update
      // We need to be careful with concurrent updates, but for simple usage this is usually okay.
      setMoulds(prev => prev.map(m => m._id === id ? originalMould : m));
    }
  }, [moulds]);

  return (
    <MouldContext.Provider value={{ moulds, setMoulds, updateMouldOptimistic, fetchMoulds, loading, setLoading }}>
      {children}
    </MouldContext.Provider>
  );
};

export const useMoulds = () => {
  const context = useContext(MouldContext);
  if (!context) {
    throw new Error('useMoulds must be used within a MouldProvider');
  }
  return context;
};
