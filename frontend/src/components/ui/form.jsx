import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { Controller, FormProvider, useFormContext, useFormState } from "react-hook-form";

import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"

const Form = FormProvider

const FormFieldContext = React.createContext({})

const FormField = (
  {
    ...props
  }
) => {
  return (
    (<FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>)
  );
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)
  const { getFieldState } = useFormContext()
  const formState = useFormState({ name: fieldContext.name })
  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

const FormItemContext = React.createContext({})

function FormItem({
  className,
  ...props
},ref) {
  const id = React.useId()

  return (
     <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn("space-y-0.5", className)} {...props} />
    </FormItemContext.Provider>
  );
}
FormItem.displayName = "FormItem";

function FormLabel({
  className,
  required,
  ...props
}, ref) {
  const { error, formItemId } = useFormField()

  return (
    <Label
    ref={ref}
      // data-slot="form-label"
      // data-error={!!error}
      className={cn(
        error && "text-destructive",
        (required || error?.message === "validationError.required") &&
          'after:pl-1 after:text-destructive after:content-["*"]',
        className
      )}
      htmlFor={formItemId}
      {...props} />
  );
}
FormLabel.displayName = "FormLabel";

function FormControl({
  ...props
},ref) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    (<Slot
      ref={ref}
      // data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props} />)
  );
}
FormControl.displayName = "FormControl";

function FormDescription({
  className,
  ...props
},ref) {
  const { formDescriptionId } = useFormField()

  return (
    (<p
    ref={ref}
      // data-slot="form-description"
      id={formDescriptionId}
      className={cn("text-muted-foreground text-sm", className)}
      {...props} />)
  );
}
FormDescription.displayName = "FormDescription";

function FormMessage({
  className,
  children,
  ...props
},ref) {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children;

  if (!body || error?.message==="validationError.required") {
    return null;
  }

  return (
    (<p
    ref={ref}
      // data-slot="form-message"
      id={formMessageId}
      className={cn("text-[0.8rem] font-medium text-destructive", className)}
      {...props}>
      {body}
    </p>)
  )}

FormMessage.displayName = "FormMessage";
export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
}
