"use client";

import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  PlusIcon,
  TrashIcon,
  PrinterIcon,
  ReceiptText,
  FlaskConical,
  Share2,
} from "lucide-react";
import { useReactToPrint } from "react-to-print";
import PrintableInvoice from "./printable-invoice";

interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

const InvoiceGenerator: React.FC = () => {
  const [logo, setLogo] = useState<string | null>(null);
  const [companyDetails, setCompanyDetails] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });
  const [billingDetails, setBillingDetails] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });
  const [items, setItems] = useState<InvoiceItem[]>([
    { description: "", quantity: 0, unitPrice: 0 },
  ]);
  const [greeting, setGreeting] = useState("Thank you for your business!");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const invoiceRef = useRef<HTMLDivElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCompanyDetailsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCompanyDetails({ ...companyDetails, [e.target.name]: e.target.value });
  };

  const handleBillingDetailsChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setBillingDetails({ ...billingDetails, [e.target.name]: e.target.value });
  };

  const handleItemChange = (
    index: number,
    field: keyof InvoiceItem,
    value: string | number
  ) => {
    const newItems = [...items];
    newItems[index] = {
      ...newItems[index],
      [field]: field === "description" ? (value as string) : Number(value),
    };
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { description: "", quantity: 0, unitPrice: 0 }]);
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    return items.reduce(
      (total, item) => total + item.quantity * item.unitPrice,
      0
    );
  };

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="sticky top-0 z-10 bg-white bg-opacity-70 backdrop-blur-md shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <ReceiptText className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">Invoice Generator</span>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="https://safwanrahimi.vercel.app/"
              className="flex items-center space-x-1 text-primary hover:text-primary-dark"
            >
              <FlaskConical className="h-5 w-5" />
              <span>More Project</span>
            </a>
            <a
              href="https://einvoice-generator.netlify.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-primary hover:text-primary-dark"
            >
              <Share2 className="h-5 w-5" />
              <span>Share</span>
            </a>
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-4 space-y-8">
        <div className="space-y-8 bg-white p-8 rounded-lg shadow-lg">
          <div className="flex justify-between items-start">
            <div className="space-y-4">
              <Label
                htmlFor="logo-upload"
                className="cursor-pointer inline-block bg-primary text-primary-foreground px-4 py-2 rounded-md"
              >
                Upload Logo
              </Label>
              <Input
                id="logo-upload"
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
              {logo && (
                <img
                  src={logo}
                  alt="Company Logo"
                  className="max-w-xs max-h-24 object-contain"
                />
              )}
            </div>
            <div className="space-y-2">
              <Input
                placeholder="Invoice Number"
                className="w-48"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
              />
              <Input
                type="date"
                className="w-48"
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Company Details</h2>
              <Input
                name="name"
                placeholder="Company Name"
                value={companyDetails.name}
                onChange={handleCompanyDetailsChange}
              />
              <Textarea
                name="address"
                placeholder="Address"
                value={companyDetails.address}
                onChange={handleCompanyDetailsChange}
              />
              <Input
                name="phone"
                placeholder="Phone"
                value={companyDetails.phone}
                onChange={handleCompanyDetailsChange}
              />
              <Input
                name="email"
                placeholder="Email"
                value={companyDetails.email}
                onChange={handleCompanyDetailsChange}
              />
            </div>
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Bill To</h2>
              <Input
                name="name"
                placeholder="Client Name"
                value={billingDetails.name}
                onChange={handleBillingDetailsChange}
              />
              <Textarea
                name="address"
                placeholder="Address"
                value={billingDetails.address}
                onChange={handleBillingDetailsChange}
              />
              <Input
                name="phone"
                placeholder="Phone"
                value={billingDetails.phone}
                onChange={handleBillingDetailsChange}
              />
              <Input
                name="email"
                placeholder="Email"
                value={billingDetails.email}
                onChange={handleBillingDetailsChange}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold">Invoice Items</h2>
            {items.map((item, index) => (
              <div key={index} className="flex space-x-4 items-end">
                <div className="flex-grow">
                  <Label htmlFor={`description-${index}`}>Description</Label>
                  <Input
                    id={`description-${index}`}
                    value={item.description}
                    onChange={(e) =>
                      handleItemChange(index, "description", e.target.value)
                    }
                  />
                </div>
                <div className="w-24">
                  <Label htmlFor={`quantity-${index}`}>Quantity</Label>
                  <Input
                    id={`quantity-${index}`}
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(index, "quantity", e.target.value)
                    }
                  />
                </div>
                <div className="w-32">
                  <Label htmlFor={`unitPrice-${index}`}>Unit Price</Label>
                  <Input
                    id={`unitPrice-${index}`}
                    type="number"
                    value={item.unitPrice}
                    onChange={(e) =>
                      handleItemChange(index, "unitPrice", e.target.value)
                    }
                  />
                </div>
                <div className="w-32">
                  <Label>Total</Label>
                  <div className="h-10 flex items-center">
                    RM {(item.quantity * item.unitPrice).toFixed(2)}
                  </div>
                </div>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => removeItem(index)}
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button onClick={addItem} className="mt-2">
              <PlusIcon className="h-4 w-4 mr-2" /> Add Item
            </Button>
          </div>

          <div className="flex justify-end space-x-4 items-end">
            <div className="text-right">
              <div className="font-bold">Total:</div>
              <div className="text-2xl font-bold">
                RM {calculateTotal().toFixed(2)}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="greeting">Greeting</Label>
            <Input
              id="greeting"
              value={greeting}
              onChange={(e) => setGreeting(e.target.value)}
              placeholder="Enter a greeting message"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <Button className="w-full max-w-md" onClick={handlePrint}>
            <PrinterIcon className="h-4 w-4 mr-2" /> Print Invoice
          </Button>
        </div>

        <div className="hidden">
          <div ref={invoiceRef}>
            <PrintableInvoice
              logo={logo}
              companyDetails={companyDetails}
              billingDetails={billingDetails}
              items={items}
              greeting={greeting}
              invoiceNumber={invoiceNumber}
              invoiceDate={invoiceDate}
            />
          </div>
        </div>

        <footer className="text-center text-sm text-gray-500 mt-8">
          © Safwan Rahimi 2024 All Rights Reserved
        </footer>
      </div>
    </div>
  );
};

export default InvoiceGenerator;
