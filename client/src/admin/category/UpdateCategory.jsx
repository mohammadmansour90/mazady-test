import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateCategory } from "../../redux/features/categorySlice";
import { PrimaryButton } from "../../routes/index";
import { Caption, commonClassNameOfInput, Title } from "../../components/common/Design";

export const UpdateCategory = () => {
  const { id } = useParams(); // ✅ get category id from route /update-category/:id
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    // ✅ dispatch update
    dispatch(updateCategory({ id, formData: { title } }))
      .unwrap()
      .then(() => {
        navigate("/category"); // go back after update
      })
      .catch((err) => {
        console.error("Update failed:", err);
      });
  };

  return (
    <section className="bg-white shadow-s1 p-8 rounded-xl">
      <Title level={5} className="font-normal mb-5">
        Update Category
      </Title>

      <form onSubmit={handleSubmit}>
        <div className="w-full my-8">
          <Caption className="mb-2">Title *</Caption>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={commonClassNameOfInput}
            placeholder="Enter new category title"
            required
          />
        </div>

        <PrimaryButton type="submit" className="rounded-none my-5">
          Update
        </PrimaryButton>
      </form>
    </section>
  );
};
