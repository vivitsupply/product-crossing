"use client";

import { useState } from "react";
import { TextareaForm } from "./crossing-input";
import { TableDemo } from "./data-table";
import { Table } from "lucide-react";

export default function CrossingClient() {
    const [submittedData, setSubmittedData] = useState([]);

    // Callback function to handle data submission
    const handleFormSubmit = (data) => {
        setSubmittedData(data);
    };

    const handleClear = () => {
        setSubmittedData([]); // Clear the submitted data
    };

    return (
        <div>
            <TextareaForm onSubmit={handleFormSubmit} onClear={handleClear} />
            {/* {submittedData.length > 0 && (
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-4">Submitted SKUs</h2>
                    <ul className="list-disc pl-5">
                        {submittedData.map((sku, index) => (
                            <li key={index}>{sku}</li>
                        ))}
                    </ul>
                </div>
            )} */}
            <TableDemo submittedData={submittedData} />
        </div>
    );
}
