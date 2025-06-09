import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { blog_data, assets, comments_data } from "../assets/assets.js";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Moment from "moment";
import Loader from "../components/Loader.jsx";
import { useAppContext } from "../context/AppContext.jsx";
import toast from "react-hot-toast";

const Blog = () => {
  const { id } = useParams();
  const { axios } = useAppContext();

  const [data, setData] = useState(null);
  const [comments, setCommnets] = useState([]);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  const fetchBlogData = async () => {
    try {
      const { data } = await axios.get(`/api/blog/${id}`);
      data.success ? setData(data.blog) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const addComment = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/blog/add-comment", {
        blog: id,
        name,
        content,
      });

      if (data.success) {
        toast.success(data.message);
        console.log(data);

        setName("");
        setContent("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchComments = async () => {
    try {
      const { data } = await axios.post("/api/blog/comments", { blogId: id });
      data.success ? setCommnets(data.comments) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchBlogData();
    fetchComments();
  }, []);

  return data ? (
    <div className="relative flex flex-col justify-between min-h-screen">
      <img
        src={assets.gradientBackground}
        alt="bg-img"
        className="absolute -top-50 -z-1 opacity-50 w-full object-cover"
      />

      <Navbar />

      <div className="text-center mt-20 text-gray-600 px-4 sm:px-6 md:px-8">
        <p className="text-primary my-4 font-medium">
          Published on: {Moment(data.createdAt).format("MMMM Do, YY")}
        </p>
        <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800">
          {data.title}
        </h1>
        <h2
          className="my-5 max-w-lg truncate mx-auto"
          dangerouslySetInnerHTML={{ __html: data.subTitle }}
        ></h2>
        <p className="inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/300 bg-primary/5 font-medium text-primary">
          Subham Saha
        </p>
      </div>

      <div className="px-4 sm:px-6 md:px-8 mx-auto w-full max-w-5xl my-10 mt-6">
        <img
          src={data.image}
          alt="cover-image"
          className="rounded-3xl mb-5 w-full object-cover"
        />
        <div
          className="rich-text"
          dangerouslySetInnerHTML={{ __html: data.description }}
        ></div>

        {/* comment section */}
        <div className="mt-14 mb-10 max-w-3xl mx-auto px-2 sm:px-4">
          <p className="font-semibold">Comments: {comments.length}</p>
          <div className="flex flex-col gap-4">
            {comments.map((comment, index) => (
              <div
                key={index}
                className="relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600"
              >
                <div className="flex items-center gap-2 mb-2">
                  <img src={assets.user_icon} alt="user-icon" className="w-6" />
                  <p className="medium">{comment.name}</p>
                </div>
                <p className="text-sm max-w-md ml-8">{comment.content}</p>
                <div className="absolute right-4 bottom-3 flex items-center gap-2 text-xs">
                  {Moment(comment.createdAt).fromNow()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* add a comment section */}
      <div className="max-w-3xl mx-auto w-full px-4 sm:px-6">
        <p className="font-semibold mb-4">Add your comment</p>
        <form onSubmit={addComment}>
          <input
            type="text"
            placeholder="Name"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="w-full p-2 border border-gray-300 rounded outline-none mb-2"
          />
          <textarea
            placeholder="Comment"
            required
            onChange={(e) => setContent(e.target.value)}
            value={content}
            className="w-full p-2 border border-gray-300 rounded outline-none h-45 mb-3"
          ></textarea>
          <button
            type="submit"
            className="bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>

      {/* social media icon */}
      <div className="my-24 max-w-3xl mx-auto w-full px-4 sm:px-6">
        <p className="font-semibold my-4">Share this article on social media</p>
        <div className="flex gap-6 flex-wrap justify-center">
          <img src={assets.facebook_icon} alt="facebook" width={50} />
          <img src={assets.twitter_icon} alt="twitter" width={50} />
          <img src={assets.googleplus_icon} alt="google plus" width={50} />
        </div>
      </div>

      <Footer />
    </div>
  ) : (
    <div>
      <Loader />
    </div>
  );
};

export default Blog;
