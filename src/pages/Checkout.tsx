import React, { useState } from 'react';

const Checkout = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('United States');
  const [city, setCity] = useState('San Francisco');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [vatNumber, setVatNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [deliveryMethod] = useState('dhl');
  const [voucher] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log({
      name,
      email,
      country,
      city,
      phone,
      companyName,
      vatNumber,
      paymentMethod,
      deliveryMethod,
      voucher,
    });
  };

  return (
    <section className="py-8 antialiased bg-gray-800 md:py-16">
      <form onSubmit={handleSubmit} className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
          <div className="min-w-0 flex-1 space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text text-white">Delivery Details</h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="your_name" className="mb-2 block text-sm font-medium text-white"> Your name </label>
                  <input
                    type="text"
                    id="your_name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="Bonnie Green"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="your_email" className="mb-2 block text-sm font-medium text-white"> Your email* </label>
                  <input
                    type="email"
                    id="your_email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="name@flowbite.com"
                    required
                  />
                </div>

                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <label htmlFor="select-country-input-3" className="block text-sm font-medium text-white"> Country* </label>
                  </div>
                  <select
                    id="select-country-input-3"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  >
                    <option value="United States">United States</option>
                    <option value="Australia">Australia</option>
                    <option value="France">France</option>
                    <option value="Spain">Spain</option>
                    <option value="United Kingdom">United Kingdom</option>
                  </select>
                </div>

                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <label htmlFor="select-city-input-3" className="block text-sm font-medium text-white"> City* </label>
                  </div>
                  <select
                    id="select-city-input-3"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  >
                    <option value="San Francisco">San Francisco</option>
                    <option value="New York">New York</option>
                    <option value="Los Angeles">Los Angeles</option>
                    <option value="Chicago">Chicago</option>
                    <option value="Houston">Houston</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="phone-input-3" className="mb-2 block text-sm font-medium text-white"> Phone Number* </label>
                  <div className="flex items-center">
                    <div className="relative w-full">
                      <input
                        type="text"
                        id="phone-input"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        placeholder="123-456-7890"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="company_name" className="mb-2 block text-sm font-medium text-white"> Company name </label>
                  <input
                    type="text"
                    id="company_name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="Flowbite LLC"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="vat_number" className="mb-2 block text-sm font-medium text-white"> VAT number </label>
                  <input
                    type="text"
                    id="vat_number"
                    value={vatNumber}
                    onChange={(e) => setVatNumber(e.target.value)}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="DE42313253"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Payment</h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-lg border p-4 ps-4 border-gray-700 bg-gray-800">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="credit-card"
                        type="radio"
                        name="payment-method"
                        value="credit-card"
                        checked={paymentMethod === 'credit-card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-2 border-gray-600 bg-gray-700 ring-offset-gray-800 focus:ring-primary-600"
                      />
                    </div>

                    <div className="ms-4 text-sm">
                      <label htmlFor="credit-card" className="font-medium leading-none text-white"> Credit Card </label>
                      <p className="mt-1 text-xs font-normal text-gray-200">Pay with your credit card</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border p-4 ps-4 border-gray-700 bg-gray-800">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="credit-card"
                        type="radio"
                        name="payment-method"
                        value="credit-card"
                        checked={paymentMethod === 'credit-card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-2 border-gray-600 bg-gray-700 ring-offset-gray-800 focus:ring-primary-600"
                      />
                    </div>

                    <div className="ms-4 text-sm">
                      <label htmlFor="credit-card" className="font-medium leading-none text-white"> Credit Card </label>
                      <p className="mt-1 text-xs font-normal text-gray-200">Pay with your credit card</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border p-4 ps-4 border-gray-700 bg-gray-800">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="credit-card"
                        type="radio"
                        name="payment-method"
                        value="credit-card"
                        checked={paymentMethod === 'credit-card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-2 border-gray-600 bg-gray-700 ring-offset-gray-800 focus:ring-primary-600"
                      />
                    </div>

                    <div className="ms-4 text-sm">
                      <label htmlFor="credit-card" className="font-medium leading-none text-white"> Credit Card </label>
                      <p className="mt-1 text-xs font-normal text-gray-200">Pay with your credit card</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Delivery Methods</h3>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="rounded-lg border p-4 ps-4 border-gray-700 bg-gray-800">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="credit-card"
                        type="radio"
                        name="payment-method"
                        value="credit-card"
                        checked={paymentMethod === 'credit-card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-2 border-gray-600 bg-gray-700 ring-offset-gray-800 focus:ring-primary-600"
                      />
                    </div>

                    <div className="ms-4 text-sm">
                      <label htmlFor="credit-card" className="font-medium leading-none text-white"> Credit Card </label>
                      <p className="mt-1 text-xs font-normal text-gray-200">Pay with your credit card</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border p-4 ps-4 border-gray-700 bg-gray-800">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="credit-card"
                        type="radio"
                        name="payment-method"
                        value="credit-card"
                        checked={paymentMethod === 'credit-card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-2 border-gray-600 bg-gray-700 ring-offset-gray-800 focus:ring-primary-600"
                      />
                    </div>

                    <div className="ms-4 text-sm">
                      <label htmlFor="credit-card" className="font-medium leading-none text-white"> Credit Card </label>
                      <p className="mt-1 text-xs font-normal text-gray-200">Pay with your credit card</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-lg border p-4 ps-4 border-gray-700 bg-gray-800">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="credit-card"
                        type="radio"
                        name="payment-method"
                        value="credit-card"
                        checked={paymentMethod === 'credit-card'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-2 border-gray-600 bg-gray-700 ring-offset-gray-800 focus:ring-primary-600"
                      />
                    </div>

                    <div className="ms-4 text-sm">
                      <label htmlFor="credit-card" className="font-medium leading-none text-white"> Credit Card </label>
                      <p className="mt-1 text-xs font-normal text-gray-200">Pay with your credit card</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
            <div className="flow-root">
              <div className="-my-3 divide-y divide-gray-800">
                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base text-gray-200 font-medium">Subtotal</dt>
                  <dd className="text-base font-medium text-white">$8,094.00</dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base text-gray-200 font-medium">Tax</dt>
                  <dd className="text-base font-medium text-white">$199</dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-bold text-white">Total</dt>
                  <dd className="text-base font-bold text-white">$8,392.00</dd>
                </dl>
              </div>
            </div>

            <div className="space-y-3">
              <button type="submit" className="flex bg-blue-700 w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4 bg-primary-600 hover:bg-primary-700 focus:ring-primary-800">Proceed to Payment</button>

              <p className="text-sm font-normal text-gray-400">One or more items in your cart require an account. <a href="#" title="" className="font-medium underline hover:no-underline text-primary-500">Sign in or create an account now.</a>.</p>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default Checkout;
