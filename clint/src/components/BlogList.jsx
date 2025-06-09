import React from "react";
import { blog_data, blogCategories } from "../assets/assets.js";
import { useState } from "react";
import { motion } from "motion/react";
import Blogcard from "./BlogCard.jsx";
import { useAppContext } from "../context/AppContext.jsx";

const BlogList = () => {
  const [menu, setMenu] = useState("All");
  const { blogs, input } = useAppContext();

  const filteredBlogs = () => {
    if (input === "") {
      return blogs;
    }
  
    const search = input.toLowerCase();
  
    return blogs.filter((blog) =>
      blog.title.toLowerCase().includes(search) ||
      blog.category.toLowerCase().includes(search)
    );
  };
  
  

  return (
    <div>
  {/* Horizontal scrollable blog categories */}
  <div className="w-full overflow-x-auto">
  <div className="min-w-fit flex justify-start sm:justify-center gap-4 sm:gap-8 my-6 px-4">
    {blogCategories.map((item) => (
      <div key={item} className="relative shrink-0">
        <button
          onClick={() => setMenu(item)}
          className={`relative cursor-pointer text-gray-500 px-2 pt-0.5 whitespace-nowrap ${
            menu === item ? "text-white" : ""
          }`}
        >
          {item}
          {menu === item && (
            <motion.div
              layoutId="underline"
              transition={{ type: "spring", damping: 30, stiffness: 500 }}
              className="absolute left-0 right-0 top-0 h-7 -z-10 bg-primary rounded-full"
            />
          )}
        </button>
      </div>
    ))}
  </div>
</div>



  {/* Blog cards grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-4 sm:mx-16 xl:mx-40">
    {filteredBlogs()
      .filter((blog) => (menu === "All" ? true : blog.category === menu))
      .map((blog) => (
        <Blogcard key={blog._id} blog={blog} />
      ))}
  </div>
</div>

  );
};

export default BlogList;
