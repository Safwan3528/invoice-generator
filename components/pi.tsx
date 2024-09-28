'use client'

import React from 'react'
import { format } from 'date-fns'

interface InvoiceItem {
  description: string
  quantity: number
  unitPrice: number
}

interface PrintableInvoiceProps {
  logo: string | null
  companyDetails: {
    name: string
    address: string
    phone: string
    email: string
  }
  billingDetails: {
    name: string
    address: string
    phone: string
    email: string
  }
  items: InvoiceItem[]
  greeting: string
  invoiceNumber: string
  invoiceDate: string
}

const PrintableInvoice: React.FC<PrintableInvoiceProps> = ({
  logo,
  companyDetails,
  billingDetails,
  items,
  greeting,
  invoiceNumber,
  invoiceDate,
}) => {
  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.quantity * item.unitPrice, 0)
  }

  return (
    <div className="bg-white p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-start mb-8">
        <div>
          {logo && <img src={logo} alt="Company Logo" className="max-w-xs max-h-24 object-contain mb-4" />}
          <h1 className="text-3xl font-bold text-gray-800">INVOICE</h1>
        </div>
        <div className="text-right">
          <p className="font-bold text-gray-600">Invoice #: {invoiceNumber}</p>
          <p className="text-gray-600">Date: {format(new Date(invoiceDate), 'MMMM dd, yyyy')}</p>
        </div>
      </div>

      <div className="flex justify-between mb-8">
        <div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">From:</h2>
          <p className="font-bold">{companyDetails.name}</p>
          <p>{companyDetails.address}</p>
          <p>{companyDetails.phone}</p>
          <p>{companyDetails.email}</p>
        </div>
        <div className="text-right">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Bill To:</h2>
          <p className="font-bold">{billingDetails.name}</p>
          <p>{billingDetails.address}</p>
          <p>{billingDetails.phone}</p>
          <p>{billingDetails.email}</p>
        </div>
      </div>

      <table className="w-full mb-8">
        <thead>
          <tr className="border-b-2 border-gray-300 text-left">
            <th className="py-2 px-2 text-gray-600">Description</th>
            <th className="py-2 px-2 text-gray-600">Quantity</th>
            <th className="py-2 px-2 text-gray-600">Unit Price</th>
            <th className="py-2 px-2 text-gray-600">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="border-b border-gray-200">
              <td className="py-2 px-2">{item.description}</td>
              <td className="py-2 px-2">{item.quantity}</td>
              <td className="py-2 px-2">RM {item.unitPrice.toFixed(2)}</td>
              <td className="py-2 px-2">RM {(item.quantity * item.unitPrice).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end mb-8">
        <div className="text-right">
          <p className="text-lg font-semibold text-gray-600">Total: RM {calculateTotal().toFixed(2)}</p>
        </div>
      </div>

      <div className="text-center text-gray-600 italic mb-8">
        {greeting}
      </div>

      <div className="text-sm text-gray-500">
        <p>Please make payment within 30 days of the invoice date.</p>
        <p>Thank you for your business!</p>
      </div>

      <footer className="mt-8 pt-4 border-t border-gray-300 text-center text-sm text-gray-500">
        © 2024 All Rights Reserved
      </footer>
    </div>
  )
}

export default PrintableInvoice