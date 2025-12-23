import React from 'react';
import { Controller } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatBP } from '@/lib/utils';

const BloodPressureInput = ({
    control,
    name,
    label = 'Blood Pressure',
    placeholder = 'Enter Blood Pressure',
    className = '',
}) => {
    return (
        <div className={`space-y-1 ${className}`}>
            {label && <Label htmlFor={name}>{label}</Label>}

            <Controller
                name={name}
                control={control}
                render={({ field, fieldState }) => (
                    <>
                        <Input
                            id={name}
                            {...field}
                            value={field.value || ''}
                            inputMode="numeric"
                            placeholder={placeholder}
                            onChange={(e) => field.onChange(formatBP(e.target.value))}
                            onBlur={() => {
                                if (field.value?.endsWith('/')) {
                                    field.onChange(field.value.slice(0, -1));
                                }
                            }}
                            onKeyDown={(e) => {
                                const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete', 'Home', 'End'];
                                if (!allowedKeys.includes(e.key) && !/^\d$/.test(e.key) && e.key !== '/') {
                                    e.preventDefault();
                                }
                            }}
                            className={
                                fieldState.error
                                    ? 'border-red-500 focus-visible:ring-red-500'
                                    : ''
                            }
                        />
                        {fieldState.error && (
                            <p className="text-sm text-red-500">
                                {fieldState.error.message}
                            </p>
                        )}
                    </>
                )}
            />
        </div>
    );
};

export default BloodPressureInput;
