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
  const [errors, setErrors] = useState<any>({});
  const [disabled, setDisabled] = useState(false);

  const handleFileChange = (e: any) => {
    setCoverImage(e.target.files[0]);
  };

  const validateImage = async (file: any) => {
    const validTypes = ['image/jpeg', 'image/png'];
    const maxSize = 2 * 1024 * 1024; // 2MB
    const img = new Image();

    return new Promise((resolve, reject) => {
      img.onload = () => {
        if (img.width < 600 || img.height < 600 || img.width > 1000 || img.height > 1000) {
          reject('Image dimensions must be between 600x600 and 1000x1000 pixels.');
        } else {
          resolve(true);
        }
      };

      img.onerror = () => {
        reject('Invalid image file.');
      };

      if (!validTypes.includes(file.type)) {
        reject('Cover Image must be in JPEG or PNG format.');
      } else if (file.size > maxSize) {
        reject('Cover Image must be less than 2MB.');
      } else {
        img.src = URL.createObjectURL(file);
      }
    });
  };

  const validateForm = async () => {
    const errors: any = {};
    if (!title && title.length <6) errors.title = 'Title is required and must be at least 6 characters';
    if (!category) errors.category = 'Category is required';
    if (!oldPrice) errors.oldPrice = 'Old Price is required';
    if (!newPrice) errors.newPrice = 'New Price is required';
    if (!coverImage) {
      errors.coverImage = 'Cover Image is required';
    } else {
      try {
       await validateImage(coverImage);
      } catch (error) {
        errors.coverImage = error;
      }
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  const handleSubmit = async (e: any) => {
    setDisabled(true);
    e.preventDefault();

    if(!await validateForm()) {
      return;
    }

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
        setDisabled(false);
      }
    } catch (error) {
      setDisabled(false);
      showMessage('Failed to add product', 'error');
    }

  }

  // // Fetch books data using the custom hook
  // const { books, totalPages, page } = useBooks(pages, pageSize);
  const onOpen = () => setIsOpen(true);


  return (
    <div className="">
      <ModalFormProduct isOpen={isOpen} onClose={() => setIsOpen(false)} onSubmit={handleSubmit} disabled={disabled}>
        <div className="grid gap-4 mb-4 grid-cols-2">
          <div className="col-span-2">
            <label htmlFor="title" className="block mb-2 text-sm font-medium text-white">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text" name="title" id="title" className="border text-sm rounded-lg block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500" placeholder="Type product name" required />
              {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="price" className="block mb-2 text-sm font-medium text-white">New Price</label>
            <input
              value={newPrice}
              onChange={(e) => setNewPrice(e.target.value)}
              type="number" name="new_price" id="new_price" className="border text-sm rounded-lg block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500" placeholder="$2999" required />
              {errors.newPrice && <p className="text-red-500 text-xs mt-1">{errors.newPrice}</p>}
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="price" className="block mb-2 text-sm font-medium text-white">Old Price</label>
            <input
              value={oldPrice}
              onChange={(e) => setOldPrice(e.target.value)}
              type="number" name="old_price" id="old_price" className="border text-sm rounded-lg block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500" placeholder="$2999" required />
              {errors.oldPrice && <p className="text-red-500 text-xs mt-1">{errors.oldPrice}</p>}
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="category" className="block mb-2 text-sm font-medium text-white">Category</label>
            <select id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border text-sm rounded-lg block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500">
              <option value="Novel">Novel</option>
              <option value="Fiction">Fiction</option>
              <option value="Biography">Biography</option>
              <option value="Technology">Technology</option>
              <option value="Science">Science</option>
            </select>
            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label htmlFor="trending" className="block mb-2 text-sm font-medium text-white">Trending</label>
            <select
              value={trending ? '1' : '0'}
              onChange={(e) => setTrending(e.target.value === '1')}
              id="trending" className="border text-sm rounded-lg block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500">
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
            {errors.trending && <p className="text-red-500 text-xs mt-1">{errors.trending}</p>}
          </div>
          <div className="col-span-2">
            <label htmlFor="cover_image" className="block mb-2 text-sm font-medium text-white">Cover Image</label>
            <input
              onChange={handleFileChange}
              type="file" name="cover_image" id="cover_image" className="border text-sm rounded-lg block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500" required />
              {errors.coverImage && <p className="text-red-500 text-xs mt-1">{errors.coverImage}</p>}
          </div>
          <div className="col-span-2">
            <label htmlFor="description" className="block mb-2 text-sm font-medium text-white">Product Description</label>
            <textarea
              name="description" // Tambahkan name agar sinkron dengan state
              value={description} // Tambahkan value agar sinkron dengan state
              onChange={(e) => setDescription(e.target.value)} // Tambahkan onChange agar sinkron dengan state
              id="description"
              rows={3}
              className="border text-sm rounded-lg block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500"
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
