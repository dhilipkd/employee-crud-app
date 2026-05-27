"use client";

import { ConfirmDialog } from "primereact/confirmdialog";

interface Props {
    visible: boolean;
    accept: () => void;
    reject: () => void;
}

export default function TConfirmDialog({
    visible,
    accept,
    reject
}: Props) {
    return (
        <ConfirmDialog
            visible={visible}
            onHide={reject}
            message="Are you sure?"
            header="Delete Confirmation"
            accept={accept}
            reject={reject}
        />
    );
}