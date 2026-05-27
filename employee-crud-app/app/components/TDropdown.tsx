"use client";

import { Dropdown } from "primereact/dropdown";

interface Props {
    value?: any;
    options?: any[];
    onChange?: (e: any) => void;
    placeholder?: string;
    label?: string;
}

export default function TDropdown({
    value,
    options,
    onChange,
    placeholder,
    label
}: Props) {
    return (
        <div className="mb-3">

            {label && <label>{label}</label>}

            <Dropdown
                value={value}
                options={options}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full"
            />

        </div>
    );
}