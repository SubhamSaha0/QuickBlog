import React, { useEffect, useState, } from 'react'
import { comments_data } from '../../assets/assets.js'
import CommentTableItem from '../../components/admin/CommentTableItem.jsx'
import { useAppContext } from '../../context/AppContext.jsx'
import toast from 'react-hot-toast'

const Comments = () => {
  const [comments, setComments] = useState([])
  const [filter, setFilter] = useState('Not approved')
  const {axios} = useAppContext()
  
  const fetchComments = async()=> {
    try {
        const token = localStorage.getItem("token")
        const {data} = await axios.get("/api/admin/comments")
        data.success ? setComments(data.comments) : toast(data.message)
        console.log(data);
        
    } catch (error) {
        console.log(error);
        
        toast(data.message)
    }
  }

  useEffect(()=> {
    fetchComments()
  }, [])
  
  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-12  bg-blue-50/50'>
        <div className='flex  max-w-3xl justify-between items-center max-w-3lx '>
            <h1>Comments</h1>
            <div className='flex gap-4'>
                <button onClick={()=>setFilter("Approved")}
                 className={`shadow border rounded-full px-4 py-1 cursor-pointer text-xs ${filter=== 'Approved' ? 'text-primary' : 'text-gray-700'}`}>Approved</button>
                <button  onClick={()=>setFilter("Not approved")}
                className={`shadow border rounded-full px-4 py-1 cursor-pointer text-xs ${filter=== 'Not approved' ? 'text-primary' : 'text-gray-700'}`}>Not approved</button>
            </div>
        </div>
        <div className='relative h-4/5 max-w-3xl overflow-x-auto mt-4 bg-white shadow rounded-lg scrollbar-hide'>
            <table className='w-full text-sm text-gray-500'>
                <thead className='text-xs text-gray-700 text-left uppercase'>
                    <tr>
                        <th scope='col' className='px-6 py-3'>Blog Title & Comment</th>
                        <th scope='col' className='px-6 py-3 max-sm:hidden'> Date </th>
                        <th scope='col' className='px-6 py-3'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {comments.filter((comment)=>{
                        if(filter === "Approved") {
                            return comment.isApproved === true
                        } 
                        return comment.isApproved === false
                    }).map((comment, index)=><CommentTableItem key={comment._id} comment={comment} index={index + 1} fetchComments={fetchComments} />)}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Comments
