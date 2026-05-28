"use client";

import { ConfirmDialog } from "primereact/confirmdialog";

interface Props {
    visible?: boolean;
    header?: string;
    message?: string;

    acceptLabel?: string;
    rejectLabel?: string;

    showFooter?: boolean;

    accept: () => void;
    reject: () => void;
}

export default function TConfirmDialog({
    header = "Confirmation",
    message = "Are you sure?",
    acceptLabel = "Yes",
    rejectLabel = "No",
    showFooter = true,
    accept,
    reject
}: Props) {
    return (
        <ConfirmDialog
            header={header}
            message={message}
            icon="pi pi-exclamation-triangle"

            acceptLabel={acceptLabel}
            rejectLabel={rejectLabel}

            accept={accept}
            reject={reject}

            footer={
                showFooter
                    ? undefined
                    : null
            }
        />
    );
}