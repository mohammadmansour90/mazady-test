import { CategoryDropDown, Caption, PrimaryButton, Title } from "../../routes";
import { commonClassNameOfInput } from "../../components/common/Design";
import { useRedirectLoggedOutUser } from "../../hooks/useRedirectLoggedOutUser";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createProduct } from "../../redux/features/ProductSlice";

const initialState = {
  title: "",
  description: "",
  price: "",
  height: "",
  lengthPic: "",   // ✅ fixed casing
  width: "",
  mediumUsed: "",  // ✅ fixed casing
  weight: "",      // ✅ fixed casing
  category: null,
};

export const AddProduct = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [product, setProduct] = useState(initialState);
  const [productImg, setProductImg] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);

  const { title, description, price, height, lengthPic, width, mediumUsed, weight, category } = product;
  const { isSuccess } = useSelector((state) => state.product);

  // Handle text/number input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Handle image file upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductImg(file); 
    setImgPreview(URL.createObjectURL(file));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("height", height);
    formData.append("lengthPic", lengthPic);
    formData.append("width", width);
    formData.append("mediumUsed", mediumUsed);
    formData.append("weight", weight);

    if (productImg) {
      formData.append("image", productImg); // ✅ must match backend
    }

    if (category) {
      formData.append("category", category.label);
    }

    await dispatch(createProduct(formData));

    if (isSuccess) {
      navigate("/product");
    }
  };

  return (
    <>
      <section className="bg-white shadow-s1 p-8 rounded-xl">
        <Title level={5} className=" font-normal mb-5">
          Create Product
        </Title>
        <hr className="my-5" />

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="w-full">
            <Caption className="mb-2">Title *</Caption>
            <input
              type="text"
              value={title}
              onChange={handleInputChange}
              name="title"
              className={commonClassNameOfInput}
              placeholder="Title"
              required
            />
          </div>

          {/* Category */}
          <div className="py-5">
            <Caption className="mb-2">Category *</Caption>
            <CategoryDropDown
              value={category}
              onChange={(selectedCategory) =>
                setProduct({ ...product, category: selectedCategory })
              }
              className={commonClassNameOfInput}
            />
          </div>

          {/* Extra fields only if category is chosen */}
          {category && (
            <>
              <div className="flex items-center gap-5 my-4">
                <div className="w-1/2">
                  <Caption className="mb-2">Height (cm)</Caption>
                  <input
                    type="number"
                    value={height}
                    onChange={handleInputChange}
                    name="height"
                    placeholder="Height"
                    className={commonClassNameOfInput}
                  />
                </div>
                <div className="w-1/2">
                  <Caption className="mb-2">Length (cm)</Caption>
                  <input
                    type="number"
                    value={lengthPic}
                    onChange={handleInputChange}
                    name="lengthPic"
                    placeholder="Length"
                    className={commonClassNameOfInput}
                  />
                </div>
              </div>

              <div className="flex items-center gap-5 my-4">
                <div className="w-1/2">
                  <Caption className="mb-2">Width (cm)</Caption>
                  <input
                    type="number"
                    value={width}
                    onChange={handleInputChange}
                    name="width"
                    placeholder="Width"
                    className={commonClassNameOfInput}
                  />
                </div>
                <div className="w-1/2">
                  <Caption className="mb-2">
                    Medium Used{" "}
                    <span className=" text-purple-400 italic">
                      (e.g., pencil, ink, charcoal)
                    </span>
                  </Caption>
                  <input
                    type="text"
                    value={mediumUsed}
                    onChange={handleInputChange}
                    name="mediumUsed"
                    placeholder="Medium used"
                    className={commonClassNameOfInput}
                  />
                </div>
              </div>

              <div className="flex items-center gap-5 mt-4">
                <div className="w-1/2">
                  <Caption className="mb-2">
                    Weight (kg)
                  </Caption>
                  <input
                    type="number"
                    value={weight}
                    onChange={handleInputChange}
                    name="weight"
                    placeholder="Weight"
                    className={commonClassNameOfInput}
                  />
                </div>
                <div className="w-1/2">
                  <Caption className="mb-2">Price *</Caption>
                  <input
                    type="number"
                    value={price}
                    onChange={handleInputChange}
                    name="price"
                    placeholder="Price"
                    className={commonClassNameOfInput}
                    required
                  />
                </div>
              </div>
            </>
          )}

          {/* Description */}
          <div>
            <Caption className="mb-2">Description *</Caption>
            <textarea
              name="description"
              value={description}
              onChange={handleInputChange}
              className={commonClassNameOfInput}
              cols="30"
              rows="5"
              required
            />
          </div>

          {/* Image */}
          <div>
            <Caption className="mb-2">Image</Caption>
            <input
              type="file"
              accept="image/*"
              className={commonClassNameOfInput}
              onChange={handleImageChange}
            />

            {imgPreview ? (
              <div>
                <img
                  src={imgPreview}
                  alt="preview"
                  className="mt-5 rounded-lg w-48 h-48 object-cover"
                />
              </div>
            ) : (
              <p>No images set for this Product</p>
            )}
          </div>

          <PrimaryButton type="submit" className="rounded-none my-5">
            CREATE
          </PrimaryButton>
        </form>
      </section>
    </>
  );
};
