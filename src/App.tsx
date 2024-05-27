import { useState } from "react"
import Navbar from "./components/Navbar"
import Posts from "./components/PostsList"
import { Post } from "./components/interfaces"

const App = () => {
  const [selectPost, setSelectedPost] = useState<Post | null>(null)
  const onSelectPost = (post: Post) => {
    setSelectedPost(post)
    console.log(selectPost)
  }

  return (
    <>
      <div className="space-y-5">
        <Navbar />
        <div className="xl:mx-36 mx-8">
          <Posts onSelectPost={onSelectPost} />
        </div>
      </div>

    </>
  )
}

export default App
