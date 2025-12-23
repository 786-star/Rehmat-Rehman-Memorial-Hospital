
import React from 'react';
import { Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatCNIC } from '@/lib/utils';


const CNICInput = ({ control, name, label = 'CNIC', placeholder = '00000-000000-0', className = '' }) => {
  return (
    <div className={`space-y-1 ${className}`}>
      {label && <Label htmlFor={name}>{label}</Label>}
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState }) => {
          const { value, onChange, ...rest } = field;

          const handleChange = (e) => {
            const formatted = formatCNIC(e.target.value);
            onChange(formatted);
          };

          return (
            <>
              <Input
                id={name}
                {...rest}
                value={value || ''}
                onChange={handleChange}
                placeholder={placeholder}
                className={fieldState.error ? 'border-red-500 focus-visible:ring-red-500' : ''}
              />
              {fieldState.error && (
                <p className="text-sm text-red-500">{fieldState.error.message}</p>
              )}
            </>
          );
        }}
      />
    </div>
  );
};

export default CNICInput;
