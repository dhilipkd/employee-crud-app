"use client";

import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { FilterMatchMode } from "primereact/api";

import { confirmDialog } from "primereact/confirmdialog";

interface TDatatableProps<T> {
    value: T[];
    dataKey: keyof T;

    excludedFields?: string[];

    onEdit?: (row: T) => void;
    onDelete?: (row: T) => void;

    showSearch?: boolean;
    showAdd?: boolean;
    onAdd?: () => void;

    paginator?: boolean;
    rows?: number;
}

export default function TDatatable<T extends Record<string, any>>({
    value,
    dataKey,

    excludedFields = [],

    onEdit,
    onDelete,

    showSearch = true,
    showAdd = false,
    onAdd,

    paginator = true,
    rows = 5
}: TDatatableProps<T>) {

    const [tableData, setTableData] = useState<T[]>([]);
    const [globalFilter, setGlobalFilter] = useState("");

    const [filters, setFilters] = useState({
        global: {
            value: null as string | null,
            matchMode: FilterMatchMode.CONTAINS
        }
    });

    useEffect(() => {
        setTableData(value);
    }, [value]);

    const actionBody = (rowData: T) => {
        return (
            <div className="flex gap-2">

                {onEdit && (
                    <Button
                        icon="pi pi-pencil"
                        rounded
                        outlined
                        onClick={() => onEdit(rowData)}
                    />
                )}

                {onDelete && (
                    <Button
                        icon="pi pi-trash"
                        severity="danger"
                        rounded
                        outlined
                        onClick={() => {
                            confirmDialog({
                                message: "Do you want to delete this record?",
                                header: "Confirm Delete",
                                icon: "pi pi-exclamation-triangle",

                                acceptClassName: "p-button-danger",

                                accept: () => {
                                    onDelete(rowData);
                                },

                                reject: () => { }
                            });
                        }}
                    />
                )}

            </div>
        );
    };

    const columnKeys = Object.keys(value[0] || {}).filter(
        (key) => !excludedFields.includes(key)
    );

    const tableHeader = (
        <div className="datatable-header">

            <div>
                {showSearch && (
                    <InputText
                        value={globalFilter}
                        placeholder="Search..."
                        onChange={(e) => {
                            setGlobalFilter(e.target.value);

                            setFilters({
                                global: {
                                    value: e.target.value,
                                    matchMode:
                                        FilterMatchMode.CONTAINS
                                }
                            });
                        }}
                    />
                )}
            </div>

            <div>
                {showAdd && (
                    <Button
                        label="Add Employee"
                        icon="pi pi-plus"
                        onClick={onAdd}
                    />
                )}
            </div>

        </div>
    );

    return (
        <DataTable
            value={tableData}
            dataKey={String(dataKey)}
            header={tableHeader}
            paginator={paginator}
            rows={rows}
            filters={filters}
            emptyMessage="No records found"
        >

            <Column
                header="S.No"
                body={(_, options) =>
                    options.rowIndex + 1
                }
            />

            {columnKeys.map((key) => (
                <Column
                    key={key}
                    field={key}
                    header={
                        key.charAt(0).toUpperCase() +
                        key.slice(1)
                    }
                />
            ))}

            {(onEdit || onDelete) && (
                <Column
                    header="Action"
                    body={actionBody}
                />
            )}

        </DataTable>
    );
}