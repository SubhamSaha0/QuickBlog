import React from 'react'
import { assets, footer_data } from '../assets/assets.js'

const Footer = () => {
  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 bg-primary/3'>
      <div className='flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500'>
        <div>
            <img src={assets.logo} alt="logo" className='w-32 sm:w-44'/>
            <p className='max-w-[410px] mt-6'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium placeat asperiores officia odio voluptatum corrupti quisquam veniam,</p>
        </div>
        <div className='flex flex-wrap justify-between w-full md:w-[45%] gap-5'>
            {footer_data.map((section, index)=>(
                <div key={index}>
                    <h3 className='font-semibold text-base text-gray-900 mb-2 md:mb-5'>{section.title}</h3>
                    <ul className='text-sm space-y-1'>{section.links.map((link, index)=>(
                        <li key={index} className='hover:underline transition'>
                            <a href="#">{link}</a>
                        </li>
                    ))}</ul>
                </div>
            ))}
        </div>
        <div></div>
      </div>
      <p className='flex items-center p-3 justify-center text-gray-700 text-sm'>Copyright 2025 © QuickBlog All Right Reserved</p>
    </div>
  )
}

export default Footer
