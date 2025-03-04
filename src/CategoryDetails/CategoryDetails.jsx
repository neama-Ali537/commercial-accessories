import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CategoryDetails = () => {
  const categories = [
    {
      _id: "6439d61c0049ad0b52b90051",
      name: "Music",
      image: "https://ecommerce.routemisr.com/Route-Academy-categories/1681511964020.jpeg",
      createdAt: "2023-04-14T22:39:24.365Z",
      updatedAt: "2023-04-14T22:39:24.365Z",
    },
    {
      _id: "6439d5b90049ad0b52b90048",
      name: "Men's Fashion",
      image: "https://ecommerce.routemisr.com/Route-Academy-categories/1681511865180.jpeg",
      createdAt: "2023-04-14T22:37:45.627Z",
      updatedAt: "2023-04-14T22:37:45.627Z",
    },
    {
      _id: "6439d58a0049ad0b52b9003f",
      name: "Women's Fashion",
      image: "https://ecommerce.routemisr.com/Route-Academy-categories/1681511818071.jpeg",
      createdAt: "2023-04-14T22:36:58.118Z",
      updatedAt: "2023-04-14T22:36:58.118Z",
    },
    {
      _id: "6439d41c67d9aa4ca97064d5",
      name: "SuperMarket",
      image: "https://ecommerce.routemisr.com/Route-Academy-categories/1681511452254.png",
      createdAt: "2023-04-14T22:30:52.311Z",
      updatedAt: "2023-04-14T22:30:52.311Z",
    },
    {
      _id: "6439d40367d9aa4ca97064cc",
      name: "Baby & Toys",
      image: "https://ecommerce.routemisr.com/Route-Academy-categories/1681511427130.png",
      createdAt: "2023-04-14T22:30:27.166Z",
      updatedAt: "2023-04-14T22:30:27.166Z",
    },
    // باقي الفئات ...
  ];

  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const selectedCategory = categories.find(cat => cat._id === categoryId);
    setCategory(selectedCategory);
  }, [categoryId]);

  if (!category) return <p>Category not found</p>;

  return (
    <div>
      <h1>{category.name}</h1>
      <img src={category.image} alt={category.name} style={{ width: "100%" }} />
      <p>{category.slug}</p>
      <p>Created on: {new Date(category.createdAt).toLocaleDateString()}</p>
      <p>Updated on: {new Date(category.updatedAt).toLocaleDateString()}</p>
    </div>
  );
};

export default CategoryDetails;
