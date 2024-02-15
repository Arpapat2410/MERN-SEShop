import React, { useEffect, useState } from 'react'
import Card from '../../components/Card'

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortOption, setSortOption] = useState("default");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/product.json")
                const data = await response.json();
                setProducts(data);
                setFilteredItems(data);
                setCategories(["all", ...new Set(data.map((item) => item.category))])
            } catch (error) {
                console.log("Error fetching data : ", error);
            }
        };
        fetchData();
    }, [])

    const filterItems = (category) => {
        const filtered = category === "all" ? products : products.filter(
            (item) => item.category === category
        );
        handleSortChange(sortOption, filtered)
        setSelectedCategory(category);
        setCurrentPage(1);
    }

    const handleSortChange = (option, items) => {
        setSortOption(option);
        let sortedItems = [...items];
        switch (option) {
            case "A-Z":
                sortedItems.sort((a, b) => a.name.localeCompare(b.name))
                break;
            case "Z-A":
                sortedItems.sort((a, b) => b.name.localeCompare(a.name))
                break;
            case "Low-High":
                sortedItems.sort((a, b) => a.price - b.price)
                break;
            case "High-Low":
                sortedItems.sort((a, b) => b.price - a.price)
                break;
            default:
                break;
        }
        setFilteredItems(sortedItems);
        setCurrentPage(1);
    }

    const indexOfLastItem = itemsPerPage * currentPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            {/* ProductList Banner */}
            <div className='section-container bg-gradient-to-r from-0%  to-100%'>
                <div className="py-48 flex flex-col justify-center items-center">
                    <div className='space-y-7 px-4 text-center'>
                        <h2 className='md:text-4xl text-4xl font-bold md:leading-snug leading-snug'>
                            Unleash Your Inner <span className='text-red'>Geek</span>: <br /> Shop
                            Our Exclusive Tech-themed Merchandise!
                        </h2>
                        <p className="text-xl">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. At voluptate error minima excepturi ducimus. Sit,
                            similique dolorum accusantium minus omnis, nam non aliquid hic voluptatum reprehenderit,
                            aliquam a. Error, corrupti?
                        </p>
                        <button className='btn bg-red px-8 py-3 font-semibold text-white rounded-full'>
                            Order Now
                        </button>
                    </div>
                </div>
            </div>
            {/* ProductList Card */}
            <div className='section-container'>
                {/* Filter */}
                <div className='flex flex-col md:flex-row flex-wrap md:justify-between items-center space-y-3 mb-8'>
                    <div className='flex flex-row justify-start md:items-center md:gap-8 gap-4 flex-wrap'>
                        {categories.map((category, index) => {
                            return (
                                <button key={index} onClick={() => filterItems(category)} className={`${selectedCategory === category ? "active" : ""}  px-4 py-2 rounded-full`} >
                                    <p className='capitalize'>{category}</p>
                                </button>
                            )
                        })}
                    </div>
                </div>
                {/* Sort Option */}
                <div className='flex justify-end mb-4 rounded-sm'>
                    <div className="bg-black p-2 rounded-lg">
                        <select id='sort' className='bg-black text-white px-2 rounded-sm'
                            onChange={(e) => handleSortChange(e.target.value, filteredItems)} value={sortOption}>
                            <option value={"default"}>Default</option>
                            <option value={"A-Z"}>A-Z</option>
                            <option value={"Z-A"}>Z-A</option>
                            <option value={"Low-High"}>Low - High</option>
                            <option value={"High-Low"}>High - Low</option>
                        </select>
                    </div>
                </div>
                {/* Card */}
                <div className='grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4'>
                    {currentItems.map((item, i) => (
                        <Card item={item} key={i} />
                    ))}
                </div>
                <div className="flex justify-center items-center my-8 flex-wrap gap-2">
                    {Array.from({
                        length: Math.ceil(filteredItems.length / itemsPerPage),
                    }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => paginate(index + 1)}
                            className={`mx-1 px-3 py-1 rounded-full ${currentPage === index + 1 ? "bg-red text-white" : "bg-gray-200"
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>
        </div >
    )
}

export default ProductList
