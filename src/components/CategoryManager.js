import { useState } from "react";

function CategoryManager({categories, setCategories}){
    const [newCategory, setNewCategory] = useState('');

    const handleAddCategory = (e) => {
        e.preventDefault();
        if (newCategory.trim() && !categories.includes(newCategory)) {
            setCategories([...categories, newCategory]);
            setNewCategory('');
        };
    };

    const handleDeleteCategory = (categoryToDelete) => {
        function filterCategories(category) {
            return category !== categoryToDelete
        }

        let updatedCategories = categories.filter(filterCategories);
        setCategories(updatedCategories);
    };
    
    return (
        <div className="category-manager">
            <h3>Manage Categories</h3>
            <form onSubmit={handleAddCategory}>
                <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="New category"
                />
                <button type="submit">Add Category</button>
            </form>
            <ul>
                {categories.map(category => (
                <li key={category}>
                    {category}
                    <button onClick={() => handleDeleteCategory(category)}>Delete</button>
                </li>
                ))}
            </ul>
        </div>
    )
}

export default CategoryManager;