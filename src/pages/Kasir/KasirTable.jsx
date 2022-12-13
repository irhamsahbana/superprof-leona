import React from "react";

export default function KasirTable(props) {
  let transaksiList = props.transaksi.map((item, i) => {
    let subtotal;
    return (
      <tr key={i}>
        <td className="px-8 py-4">{item.tindakan}</td>
        <td className="px-8 py-4 text-center">{item.qty}</td>
        <td className="px-8 py-4 text-right">{item.biaya}</td>
        <td className="px-8 py-4 text-center">{item.diskon}</td>
        <td className="px-8 py-4 text-right">{item.total}</td>
      </tr>
    );
  });

  
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto">
        <div className="p-1.5 w-full inline-block align-middle">
          <div className="overflow-x-auto border">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">Tindakan</th>
                  <th className="p-3">Qty</th>
                  <th className="p-3">Biaya</th>
                  <th className="p-3">Diskon</th>
                  <th className="p-3">Total Biaya</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transaksiList}
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="p-2 mt-8">Subtotal: </td>
                  <td className="p-2 font-bold text-right">Rp. 2.100.000</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="p-2">Diskon: </td>
                  <td className="p-2 font-bold text-right">Rp. 100.000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
