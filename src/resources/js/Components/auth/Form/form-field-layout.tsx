import React from 'react'

import InputError from './InputError'
import { Label } from '@/Components/ui/label'
import { cn } from '@/lib/utils'


const FormFieldLayout = ({
    children,
    label,
    description,
    fieldName,
    error,
    className
}: {
    children: React.ReactNode,
    label: string,
    fieldName: string,
    description?: string,
    error?: string,
    className?: string
}) => {

    const isError = error ? true : false
    return (
        <div className={cn("space-form-field", className)}>
            <div className=''>
            <Label htmlFor={fieldName}
            className={cn(error ? 'text-destructive' : '')}
            >{label}</Label>
            {description && <p className="form-description">{description}</p>}
            </div>
            {children}
            <InputError message={error} className="mt-2 font-semibold" />
        </div>
    )
}

export default FormFieldLayout