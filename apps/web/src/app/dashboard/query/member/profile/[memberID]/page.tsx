import { GetMemberFullDetails } from "@/app/graphqlRequest/queries";
import LoadingSpinner from "@/app/components/Loading";
import { request } from "graphql-request";
import { headers } from "next/headers"
const graphqlURL = process.env.NEXT_PUBLIC_GRAPHQL_API!;



export default async function MemberData({
    params: { memberID, ...params },
  }: {
    params: { memberID: string }
  }) {
    // Wait for the playlists

    console.log("headers => ", headers().get('cookie'))
     
    // const response: any = await request({
    //     url: graphqlURL,
    //     document: GetMemberFullDetails,
    //     variables: { request: {memberID} },
    //   });
   
   
    return (
       <div>
         <p>Hello {memberID}</p>
       </div>
    )
  }


// // pages/posts/[slug].js
// import { useRouter } from 'next/router';

// const Post = ({ post }) => {
//   const router = useRouter();

//   if (router.isFallback) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       <h1>{post.title}</h1>
//       <p>{post.content}</p>
//     </div>
//   );
// };

// export async function getServerSideProps({ params }) {
//   const { slug } = params;

//   // Fetch data for the specific post using slug
//   const response = await fetch(`https://api.example.com/posts/${slug}`);
//   const post = await response.json();

//   return {
//     props: { post },
//   };
// }

// export default Post;