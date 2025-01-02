import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import OrderService from '../services/OrderService';
import { useFlashMessage } from '../context/FlashMessageContext';
import { useNavigate } from 'react-router-dom';
import NotFound from '../components/errors/NotFound';
import useCities from '../hooks/useCities';
import useProvinces from '../hooks/useProvinces';
import ShippingService from '../services/ShippingService';

interface City {
  city_id: string; // or number, depending on your data
  city_name: string;
  postal_code: string;
}

interface Province {
  province_id: string; // or number, depending on your data
  province: string;
}

interface FormValues {
  name: string;
    email: string;
    address: {
      city: number;
      province: string;
      state: string;
      zipcode: string;
    };
    phone: string;
    total_price: number;
    book_ids: number[];
    user_id: any;
    shipping: {
      shipping_type: 'jne' | 'pos' | 'tiki' | 'ninja' | 'jnt';
      shipping_cost: number;
      shipping_service: string;
    };
}


const Checkout = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const { showMessage } = useFlashMessage();
  const navigate = useNavigate();
  // const [province, setProvince] = useState<string>('');
  // const [provinceName, setProvinceName] = useState('');
  // const [courier, setCourier] = useState('jne');
  const [services, setServices] = useState(null);
  const [formData, setFormData] = useState<FormValues>({
    name: '',
    email: '',
    address: {
      city: 0,
      province: '',
      state: '',
      zipcode: '',
    },
    phone: '',
    total_price: cart.reduce((acc, item) => acc + item.price, 0),
    book_ids: cart.map((item) => item.id),
    user_id: user.id,
    shipping: {
      shipping_type: 'jne',
      shipping_cost: 0,
      shipping_service: '',
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
  
    // Split the name by dots to handle nested fields
    const keys = name.split('.') as Array<keyof FormValues | keyof FormValues['address']>;
  
    // Create a copy of the formData
    let updatedFormData = { ...formData };
  
    // Use a reference to traverse the object
    let currentLevel: any = updatedFormData;
  
    // Traverse the keys to reach the nested field
    for (let i = 0; i < keys.length - 1; i++) {
      currentLevel = currentLevel[keys[i]];
    }
  
    // Update the value at the nested field
    currentLevel[keys[keys.length - 1]] = value;

    if (keys.join('.') === 'address.city') {
      const selectedCity = cities.find(city => city.city_id === value);
      if (selectedCity) {
        updatedFormData.address.zipcode = selectedCity.postal_code; // Update the zipcode
      } else {
        updatedFormData.address.zipcode = ''; // Reset if city not found
      }
    }
  
  
    // Set the updated formData
    setFormData(updatedFormData);
  };
  

  const { provinces }: { provinces: Province[] } = useProvinces();
  const { cities }: { cities: City[] } = useCities(formData.address.province);


  //tax 11%f
  const tax = 0.11;
  const totalTax = cart.reduce((acc, item) => acc + item.price, 0) * tax;

  const orderSummary = cart.reduce((acc, item) => acc + item.price, 0) + totalTax;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // const orderRequest = {
      //   name,
      //   email,
      //   address: {
      //     city,
      //     provinceName,
      //     state,
      //     zipcode,
      //   },
      //   phone,
      //   total_price: cart.reduce((acc, item) => acc + item.price, 0),
      //   book_ids: cart.map((item) => item.id),
      //   user_id: user.id,
      //   shopping: {
      //     shipping_type: 'JNE',
      //     shipping_cost: 10000,
      //     shipping_service: 'REG'
      //   }
      // }

      const response = await OrderService.createOrder(formData);
      console.log(response);
      if (response) {
        showMessage('Order created successfully', 'success');
        clearCart();
        navigate('/');
      }
    } catch (error) {
      showMessage('Failed to create order', 'error');
      console.error("Failed to create order")
      throw new Error("Failed to create order")
    }
  };

  if (cart.length === 0) {
    return (
      <NotFound />
    )
  }

  // const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setProvince(e.target.value);
  //   //find province name by id
  //   setProvinceName(provinces.find((province) => province.province_id === e.target.value)?.province || '');
  // }

  // const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const selectedCity = e.target.value;
  //   setCity(selectedCity);
  //   //get postal code by city name
  //   const postalCode = cities.find((city) => city.city_name === e.target.value)?.postal_code || '';
  //   setZipcode(postalCode);
  // }

  // const handleCourierChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setCourier(e.target.value);
  // }

  const submitCostCourier = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await ShippingService.getCostOngkir({
        origin: 501,
        destination: formData.address.city,
        weight: 1700,
        courier: formData.shipping.shipping_type,
      });

      setServices(response);
    } catch (error) {
      console.error('Error fetching shipping cost:', error);
      // Handle the error appropriately
    }
  };

  console.log(services);



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
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="Bonnie Green"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="your_email" className="mb-2 block text-sm font-medium text-white"> Your email* </label>
                  <input
                    type="email"
                    name='email'
                    id="your_email"
                    value={formData.email}
                    onChange={handleChange}
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
                    name="address.province"
                    value={formData.address.province}
                    onChange={handleChange}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  >
                    {provinces.map((province) => (
                      <option key={province.province_id} value={province.province_id}>{province.province}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="state-input-3" className="mb-2 block text-sm font-medium text-white"> State* </label>
                  <input
                    type="text"
                    id="state-input-3"
                    name="address.state"
                    value={formData.address.state}
                    onChange={handleChange}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    placeholder="California"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="zipcode-input-3" className="mb-2 block text-sm font-medium text-white"> Zipcode* </label>
                  <input
                    type="text"
                    id="zipcode-input-3"
                    name="zipcode"
                    value={formData.address.zipcode}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                    disabled
                    required
                  />
                </div>

                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <label htmlFor="select-city-input-3" className="block text-sm font-medium text-white"> City* </label>
                  </div>
                  <select
                    id="select-city-input-3"
                    name="address.city"
                    value={formData.address.city}
                    onChange={handleChange}
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                  >
                    {cities.map((city) => (
                      <option key={city.city_id} value={city.city_id}>{city.city_name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="phone-input-3" className="mb-2 block text-sm font-medium text-white"> Phone Number* </label>
                  <div className="flex items-center">
                    <div className="relative w-full">
                      <input
                        type="text"
                        name="phone"
                        id="phone-input"
                        value={formData.phone}
                        onChange={handleChange}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        placeholder="123-456-7890"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Delivery Methods</h3>

              {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
              </div> */}


              {/* //button check ongkir */}
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <label htmlFor="select-city-input-3" className="block text-sm font-medium text-white"> Courier* </label>
                </div>
                <select
                name="shipping.shipping_type"
                  id="select-city-input-3"
                  value={formData.shipping.shipping_type}
                  onChange={handleChange}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                >
                  <option value="jne">JNE</option>
                  <option value="pos">POS</option>
                  <option value="tiki">TIKI</option>
                  <option value="ninja">NINJA</option>
                  <option value="jnt">JNT</option>
                </select>
              </div>
              <button
                onClick={submitCostCourier}
                className="flex bg-blue-700 w-full items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4 bg-primary-600 hover:bg-primary-700 focus:ring-primary-800">Check Ongkir</button>

            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">Select Shipping</h3>

              <div className="">
                {
                  services?.map((service) => (
                    <div key={service.code} className="rounded-lg border p-4 ps-4 border-gray-700 bg-gray-800">
                      <div className="">

                        <div className="text-sm">
                          <div className='flex flex-row'>
                          {service.costs.map((cost, costKey) => (
                            <div key={costKey} className="rounded-lg border p-4 mb-4 border-gray-700 bg-gray-800">
                              <div className="flex items-center mb-2">
                                <input
                                  id={`payment-method-${costKey}`}
                                  type="radio"
                                  name="payment-method"
                                  value={service.code}
                                  onChange={(e) => setPaymentMethod(e.target.value)}
                                  className="h-4 w-4 border-gray-300 text-primary-600 focus:ring-2 border-gray-600 bg-gray-700 ring-offset-gray-800 focus:ring-primary-600"
                                />
                                <label htmlFor={`payment-method-${costKey}`} className="ml-2 font-medium leading-none text-white">
                                  {cost.service}
                                </label>
                              </div>
                              <div className="ml-6">
                                <p className="font-medium leading-none text-white">Cost: {cost.cost[0].value}</p>
                                <p className="mt-1 text-xs font-normal text-gray-200">{cost.description}</p>
                              </div>
                            </div>
                          ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>

          <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
            <div className="flow-root">
              <div className="-my-3 divide-y divide-gray-800">
                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base text-gray-200 font-medium">Subtotal</dt>
                  <dd className="text-base font-medium text-white">{totalPrice}</dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base text-gray-200 font-medium">Tax</dt>
                  <dd className="text-base font-medium text-white">{totalTax.toFixed(2)}</dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-bold text-white">Total</dt>
                  <dd className="text-base font-bold text-white">{orderSummary.toFixed(2)}</dd>
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
