import { useState, useEffect } from 'react';

// Generic type for form data that can handle different field types
type FormData<T extends Record<string, any>> = T & {
  lastUpdated?: string;
};

const STORAGE_PREFIX = 'billstation_form_';

export const useFormPersistence = <T extends Record<string, any>>(
  formName: string, 
  initialData: T
) => {
  const storageKey = `${STORAGE_PREFIX}${formName}`;
  
  // Initialize state with data from localStorage or initialData
  const [formData, setFormData] = useState<FormData<T>>(() => {
    if (typeof window === 'undefined') return { ...initialData };
    
    try {
      const savedData = localStorage.getItem(storageKey);
      if (!savedData) return { ...initialData };
      
      // Parse and merge with initial data to ensure all fields are present
      const parsedData = JSON.parse(savedData);
      return { ...initialData, ...parsedData };
    } catch (error) {
      console.error('Error parsing saved form data:', error);
      return { ...initialData };
    }
  });

  // Update localStorage whenever formData changes
  useEffect(() => {
    if (Object.keys(formData).length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(formData));
    } else {
      localStorage.removeItem(storageKey);
    }
  }, [formData, storageKey]);

  // Function to update form data
  const updateFormData = (updates: Partial<T>) => {
    setFormData(prev => {
      const updated = {
        ...prev,
        ...updates,
        lastUpdated: new Date().toISOString()
      };
      return updated as FormData<T>;
    });
  };

  // Function to clear form data
  const clearFormData = () => {
    setFormData({ ...initialData } as FormData<T>);
    localStorage.removeItem(storageKey);
  };

  return {
    formData,
    updateFormData,
    clearFormData,
    setFormData: (data: T) => setFormData({ ...data, lastUpdated: new Date().toISOString() } as FormData<T>)
  };
};

// Helper function to clear all persisted form data
export const clearAllPersistedForms = () => {
  if (typeof window === 'undefined') return;
  
  Object.keys(localStorage).forEach(key => {
    if (key.startsWith(STORAGE_PREFIX)) {
      localStorage.removeItem(key);
    }
  });
};
