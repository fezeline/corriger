import React from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';

interface DatePickerProps {
  label: string;
  value: string;
  onChange: (date: string) => void;
  required?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({ label, value, onChange, required = false }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 pl-10"
        />
        <CalendarIcon className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
      </div>
    </div>
  );
};

export default DatePicker;