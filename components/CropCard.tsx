
import React from 'react';
import type { Crop } from '../types';

interface CropCardProps {
  crop: Crop;
  onSelect: (crop: Crop) => void;
}

const CropCard: React.FC<CropCardProps> = ({ crop, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(crop)}
      className="bg-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center text-center cursor-pointer
                 transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:bg-green-100 border-2 border-transparent hover:border-green-600"
    >
      <div className="w-16 h-16 mb-3 text-green-700">{crop.icon}</div>
      <h3 className="text-lg font-semibold text-gray-800">{crop.name}</h3>
    </div>
  );
};

export default CropCard;
