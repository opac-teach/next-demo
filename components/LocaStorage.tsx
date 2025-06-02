'use client';

import { useState } from 'react';

const LocalStorage: React.FC = () => {

  const [value, setValue] = useState('');

  const [localContent, setLocalContent] = useState<string | null>(localStorage.getItem('userValue'));

  const handleAdd = () => {
    localStorage.setItem('userValue', value);
    setLocalContent(value);
    setValue('');
  };

  return (
    <div className="flex justify-center">
      <div className="space-y-2 w-md flex flex-col gap-8">
        
        <span>Contenu du local storage : {localContent ?? '—'}</span>

        <div className="flex flex-col gap-2">
          <input
            className="border p-1 border-black rounded-sm"
            type="text"
            placeholder="Entrer une valeur"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <button
            className="border px-2 rounded-sm bg-blue-600 text-white"
            onClick={handleAdd}
          >
            Ajouter
          </button>
        </div>
      </div>
    </div>

  );
};

export default LocalStorage;
