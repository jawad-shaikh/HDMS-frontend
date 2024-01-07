import React, { useState } from 'react';

interface Option {
  value: string;
  label: string;
}

const MultiSelect: React.FC<{ options: Option[] }> = ({ options }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleOptionChange = (value: string) => {
    if (selectedOptions.includes(value)) {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    } else {
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  return (
    <div>
      <label>Select Options:</label>
      <select multiple={true} value={selectedOptions} onChange={() => {}}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <div>
        <label>Selected Options:</label>
        {selectedOptions.map((value) => (
          <div key={value}>
            <input
              type="checkbox"
              value={value}
              checked={selectedOptions.includes(value)}
              onChange={() => handleOptionChange(value)}
            />
            <span>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
