// components/ admin/ common/ AdminTable.tsx

import React from "react"

type AdminTableProps = {
    headers: React.ReactNode;
    children: React.ReactNode;
    minWidth?: string;
}

export default function AdminTable({
    headers,
    children,
    minWidth = "800px",
}: AdminTableProps) {

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

            <div className="overflow-x-auto">

                <table
                    className="w-full"
                    style={{minWidth}}
                >
                    <thead className="bg-gray-50">
                        {headers}
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                        {children}
                    </tbody>
                </table>
            </div>
        </div>
    )
}