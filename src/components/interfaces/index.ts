export interface Post {
  id: number;
  title: string;
  body:string;
}
export interface Comments {
  id: number;
  postId: number;
  name:string;
  email:string;
  body:string
}