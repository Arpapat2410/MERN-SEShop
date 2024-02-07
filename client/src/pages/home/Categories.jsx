import React from 'react'
const  categoryUtems = [
  {
    id : 1 , 
    title : "Clothing",
    description : "(25 items)",
    images : "/images/home/category/img1.jpg "
  },
  {
    id : 2 , 
    title : "Accessories",
    description : "(12 items)",
    images : "/images/home/category/img2.jpg "
  },
  {
    id : 3 , 
    title : "Gadgets",
    description : "(48 items)",
    images : "/images/home/category/img3.jpg "
  },
  {
    id : 4 , 
    title : "Swag",
    description : "(25 items)",
    images : "/images/home/category/img4.jpg "
  },
]


const Categories = () => {
  return (
    <div className='section-container py-16'>
      <div className='text-center'>
        <p className='subtitle'>Customer Favories</p>
        <p className='title'>Popular Categories</p>
      </div>
      <div className='flex flex-col sm:flex-row flex-wrap gap-6 justify-around items-center mt-12'>
        {categoryUtems.map((item,i) => (
        <div key={i} className='shadow-lg rounded-md bg-white py-6 px-5 w-72 text-center cursor-pointer hover:translate-y-4 transition-all duration-300'>
          <div className='w-full mx-auto flex items-center justify-center'>
            <img 
            src={item.images} 
            alt='' 
            className='bg-red p-2 rounded-full w-28 h-28'/>

          </div>
          <div className='mt-5 space-y-1'>
            <h5 className='text-[#1E1E1E] font-semibold'>{item.title}</h5>
            <p className='text-secondary font-semibold'>{item.description}</p>
          </div>
        </div>
        ))}
      </div>
    </div>
  )
}

export default Categories