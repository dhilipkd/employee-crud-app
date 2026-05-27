"use client"

import { InputText } from "primereact/inputtext"

interface Props {
    value: string;
    onChange?: (e: any) => void;
    placeholder?: string;
    label?: string;
}

export default function TInputField({
    value,
    onChange,
    placeholder="Enter a Text",
    label,
}: Props) {
    return (
        <div className="mb-3">
            {label &&
                <label>{label}</label>}

            <InputText
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full"
            />
        </div>
    )
}
