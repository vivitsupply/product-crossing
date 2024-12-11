"use client";

import { useEffect, useState } from "react";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

export function TableDemo({ submittedData }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchCrossings() {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch("/api/crossings", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ compSkus: submittedData }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || "Failed to fetch data");
                }

                const { data } = await response.json();
                setData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchCrossings();
    }, [submittedData]);

    return (
        <div className="mt-8">
            <h2 className="font-medium">Crossing Results</h2>
            <Card className="mt-4">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Competitor SKU</TableHead>
                            <TableHead>VIVIT SKU</TableHead>
                            <TableHead>Supplier</TableHead>
                            <TableHead>Category</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center text-md">
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : error ? (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center text-md text-red-500">
                                    Error: {error}
                                </TableCell>
                            </TableRow>
                        ) : data.length > 0 ? (
                            data.map((sku, index) => (
                                <TableRow key={`${sku["comp-sku"]}-${index}`}>
                                    <TableCell className="font-medium">{sku["comp-sku"] || "-"}</TableCell>
                                    <TableCell>
                                        {sku["comp-sku"] === "SKU not in Database"
                                            ? "-" // Display "-" if comp-sku is "SKU not in Database"
                                            : sku["vivit-sku"] === "CPT"
                                              ? "Contact Product Team"
                                              : sku["vivit-sku"] === "CSKU"
                                                ? "Possible Cardinal SKU"
                                                : sku["comp-sku"] && !sku["vivit-sku"]
                                                  ? "No Cross"
                                                  : sku["vivit-sku"] || "-"}
                                    </TableCell>
                                    <TableCell>{sku["supplier"] || "-"}</TableCell>
                                    <TableCell>{sku["category"] || "-"}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center text-md">
                                    No results
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
}
