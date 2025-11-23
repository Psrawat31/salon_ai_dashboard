import React from "react";
import * as XLSX from "xlsx";
import useCustomerStore from "../store/useCustomerStore";

export default function UploadCustomers() {
  const { customers, setCustomers } = useCustomerStore();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheet = workbook.Sheets[workbook.SheetNames[0]];

      // Convert sheet → array of arrays
      const raw = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const headers = raw[0]; // first row
      const rows = raw.slice(1);

      // Convert rows → objects
      const finalData = rows.map((row) => {
        let obj = {};
        headers.forEach((h, i) => {
          obj[h] = row[i];
        });
        return obj;
      });

      console.log("FINAL PARSED DATA:", finalData);

      // Save to sessionStorage
      sessionStorage.setItem("customers", JSON.stringify(finalData));

      // Save to Zustand
      setCustomers(finalData);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Upload Customers</h2>

      <input
        type="file"
        accept=".xlsx"
        onChange={handleFileUpload}
        className="mb-4 border px-3 py-2 rounded"
      />

      {customers.length === 0 ? (
        <p>No data uploaded yet.</p>
      ) : (
        <table className="mt-4 w-full border-collapse">
          <thead>
            <tr>
              <th className="border px-3 py-2">name</th>
              <th className="border px-3 py-2">lastVisit</th>
              <th className="border px-3 py-2">service</th>
              <th className="border px-3 py-2">revenue</th>
              <th className="border px-3 py-2">contacted</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c, i) => (
              <tr key={i}>
                <td className="border px-3 py-2">{c.name}</td>
                <td className="border px-3 py-2">{c.lastVisit}</td>
                <td className="border px-3 py-2">{c.service}</td>
                <td className="border px-3 py-2">{c.revenue}</td>
                <td className="border px-3 py-2">{c.contacted}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
