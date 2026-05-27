"use client";

import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";

interface Props {
    visible: boolean;
    onHide: () => void;
    children: React.ReactNode;

    header?: string;
    showHeader?: boolean;
    showFooter?: boolean;

    primaryLabel?: string;
    primaryAction?: () => void;

    secondaryLabel?: string;
    secondaryAction?: () => void;
}

export default function TOffCanvas({
    visible,
    onHide,
    children,

    header = "",
    showHeader = true,
    showFooter = true,

    primaryLabel = "Save",
    primaryAction,

    secondaryLabel = "Cancel",
    secondaryAction
}: Props) {

    return (
        <Sidebar
            visible={visible}
            onHide={onHide}
            position="right"
            header={showHeader ? header : undefined}
            className="w-[35rem]"
        >
            <div className="flex flex-col h-full">

                {/* Body */}
                <div className="flex-1">
                    {children}
                </div>

                {/* Footer */}
                {showFooter && (
                    <div className="flex justify-end gap-3 border-t pt-4 mt-4">

                        <Button
                            label={secondaryLabel}
                            severity="secondary"
                            onClick={secondaryAction || onHide}
                        />

                        <Button
                            label={primaryLabel}
                            onClick={primaryAction}
                        />
                    </div>
                )}

            </div>
        </Sidebar>
    );
}