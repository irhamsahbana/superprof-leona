import React from "react";

export default function TableMetodePembayaran() {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto p-3">
        <div className="w-full inline-block align-middle">
          <div className="overflow-hidden border">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="text-left bg-gray-100">
                <th className="p-3 w-full">Metode Pembayaran</th>
                <th className="p-3">Nominal</th>
                <th className="p-3">Keterangan</th>
              </thead>
              <tbody >
                <tr>
                  <td className="w-44 pr-8 p-3">Cash</td>
                  <td className="w-32 pr-8 p-3">Rp.2.000.000</td>
                  <td className="w-auto pr-8 p-3">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
