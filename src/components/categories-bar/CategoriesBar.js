import React, { useState, useEffect } from 'react';
import { fetchCategories } from '../../servicesApi/CategoryApi';
import './categories-bar.css';
import { Link } from 'react-router-dom'



export default function CategoriesBar({ onSelectCategory , selectedCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
    };
    getCategories();
  }, []);

  return (
    <>
  <div className="categories-title">Categories</div>
  <div className="categories-list">
    {categories.map(category => (
      <div key={category.category_id} className="category-item" onClick={() => onSelectCategory(category)}>
         <Link 
          to= {`/products/category/${category.category_name}`}
          >
            <span className='category-name'>{category.category_name}</span>
            </Link>
        
      </div>
    ))}
  </div>
  </>
  );
}
