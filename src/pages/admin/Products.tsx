import ModalFormProduct from "../../components/modals/ModalFormProduct";
import TableProduct from "../../components/tables/TableProduct";
import { useFlashMessage } from "../../context/FlashMessageContext";
import BookService from "../../services/BookService";
import { useState } from "react";

const Products = () => {
  const { showMessage }: any = useFlashMessage();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [trending, setTrending] = useState(false);
  const [oldPrice, setOldPrice] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [coverImage, setCoverImage] = useState(null);

  const handleFileChange = (e: any) => {
    setCoverImage(e.target.files[0]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('category', category);
    formData.append('trending', trending.toString());
    formData.append('old_price', oldPrice);
    formData.append('new_price', newPrice);
    if (coverImage) {
      formData.append('cover_image', coverImage);
    }

    try {
      const response = await BookService.createBook(formData);
      console.log(response)
      if (response && response.status === true) {
        showMessage('Product added successfully', 'success');
        setIsOpen(false);
      }
    } catch (error) {
      showMessage('Failed to add product', 'error');
    }

  }

  // // Fetch books data using the custom hook
  // const { books, totalPages, page } = useBooks(pages, pageSize);
  const onOpen = () => setIsOpen(true);


  return (
    <div className="">
      <ModalFormProduct isOpen={isOpen} onClose={() => setIsOpen(false)} onSubmit={handleSubmit}>
        {/* <ProductForm /> */}
        <div className="grid gap-4 mb-4 grid-cols-2">
          <div className="col-span-2">
            <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text" name="title" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Price</label>
            <input
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              type="number" name="new_price" id="new_price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Old Price</label>
            <input
              value={oldPrice}
              onChange={(e) => setOldPrice(e.target.value)}
              type="number" name="old_price" id="old_price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required />
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
            <select id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
              <option value="Novel">Novel</option>
              <option value="Fiction">Fiction</option>
              <option value="Biography">Biography</option>
              <option value="Technology">Technology</option>
              <option value="Science">Science</option>
            </select>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="trending" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Trending</label>
            <select
              value={trending ? '1' : '0'}
              onChange={(e) => setTrending(e.target.value === '1')}
              id="trending" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </div>
          <div className="col-span-2">
            <label htmlFor="cover_image" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cover Image</label>
            <input
              onChange={handleFileChange}
              type="file" name="cover_image" id="cover_image" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
          </div>
          <div className="col-span-2">
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Description</label>
            <textarea
              name="description" // Tambahkan name agar sinkron dengan state
              value={description} // Tambahkan value agar sinkron dengan state
              onChange={(e) => setDescription(e.target.value)} // Tambahkan onChange agar sinkron dengan state
              id="description"
              rows={3}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write product description here"
            />
          </div>
        </div>
      </ModalFormProduct>

      {/* Pass the Book data directly to the Table */}
      <TableProduct
        onOpen={onOpen}
      />
    </div>
  );
};

export default Products;
