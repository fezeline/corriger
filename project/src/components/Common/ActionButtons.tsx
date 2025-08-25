import React from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';

interface ActionButtonsProps {
  onAdd?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  showAdd?: boolean;
  showEdit?: boolean;
  showDelete?: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onAdd,
  onEdit,
  onDelete,
  showAdd = true,
  showEdit = true,
  showDelete = true,
}) => {
  return (
    <div className="flex space-x-2">
      {showAdd && onAdd && (
        <button
          onClick={onAdd}
          className="inline-flex items-center px-3 py-1.5 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
        >
          <Plus className="w-4 h-4 mr-1" />
          Ajouter
        </button>
      )}
      
      {showEdit && onEdit && (
        <button
          onClick={onEdit}
          className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        >
          <Edit className="w-4 h-4 mr-1" />
          Modifier
        </button>
      )}
      
      {showDelete && onDelete && (
        <button
          onClick={onDelete}
          className="inline-flex items-center px-3 py-1.5 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition-colors"
        >
          <Trash2 className="w-4 h-4 mr-1" />
          Supprimer
        </button>
      )}
    </div>
  );
};

export default ActionButtons;