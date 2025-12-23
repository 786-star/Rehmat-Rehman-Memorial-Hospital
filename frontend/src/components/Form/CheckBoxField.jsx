import React from "react";
import { Controller } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const CheckBoxField = ({ name, label, control, className = '' }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className={`flex items-center space-x-2 ${className}`}>
          <Checkbox
            id={name}
            checked={field.value}
            onCheckedChange={(checked) => field.onChange(!!checked)}
          />
          {label && (
            <Label
              htmlFor={name}
              className="text-sm font-medium leading-none"
            >
              {label}
            </Label>
          )}
        </div>
      )}
    />
  );
};

export default CheckBoxField;

