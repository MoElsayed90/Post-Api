
import { FC, useEffect, useState } from "react";
import { Comments, Post } from './interfaces';
import axiosInstance from "./config/axios.config";
import SearchInput from "./SearchInput";

export interface IProps {
  onSelectPost: (post: Post) => void
}

// }
const Posts: FC<IProps> = ({ onSelectPost }) => {
  const [posts, setPosts] = useState<Post[]>([])
  const [searchInput, setSearchInput] = useState('')
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage, setPostsPerPage] = useState<number>(10);
  useEffect(() => {
    const fetchPosts = async () => {
      const PostsResp = await axiosInstance.get("/posts")
      setPosts(PostsResp.data)
    }
    fetchPosts()


  }, [])
  const [comments, setComments] = useState<Comments[]>([])
  useEffect(() => {
    const fetchComments = async () => {
      const CommentsResp = await axiosInstance.get("/comments")
      setComments(CommentsResp.data)
    }
    fetchComments()
  }, [])


  const handleSerachInput = (searchInput: string) => {
    setSearchInput(searchInput)
  }
  const filteredPosts = posts.filter((post: Post) => (post.title).toLowerCase().includes(searchInput.toLowerCase()))
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber: number) => {
    if (pageNumber <= 10 && pageNumber >= 1) {
      setCurrentPage(pageNumber);
    }
  }
  console.log(setPostsPerPage)
  return (
    <>
      <div className="container">
        <SearchInput onSearch={handleSerachInput} />
      </div>
      {
        currentPosts.map((post: Post) => (


          <div className="collapse bg-base-200 my-5 collapse-arrow ">
            <input type="checkbox" key={post.id} onClick={() => onSelectPost(post)} />
            <div className="collapse-title text-xl font-medium ">
              {post.id} - {post.title}
            </div>
            <div className="collapse-content mx-5">
              <p className="text-lg font-bold px-5">{post.title}</p>
              <p className="px-5">{post.body}</p>
              <div className="collapse collapse-plus bg-base-200">
                <input type="radio" name="my-accordion-3" defaultChecked />
                <div className="collapse-title text-xl font-medium capitalize">
                  comments
                </div>
                <div className="collapse-content space-y-5">
                {
                comments.filter((comment: Comments) => (comment.postId === post.id)).map((comment: Comments) => (

                  <>
                  <div className="">
                  <span className="font-bold">{comment.email}</span> :
                  <span> {comment.name}</span>
                  </div>
                  </>

                ))
              }
                </div>
              </div>
           

            </div>
          </div>

        ))

      }
      <div className="join grid grid-cols-2 mx-20 space-x-2 my-3">
        <button className="join-item btn btn-outline disabled:cursor-not-allowed" disabled={currentPage === 1} onClick={() => paginate(currentPage - 1)}>
          Previous
        </button>
        <button className="join-item btn btn-outline disabled:cursor-not-allowed" disabled={currentPage === 10} onClick={() => paginate(currentPage + 1)}>
          Next
        </button>
      </div>
    </>
  )
}

export default Posts;