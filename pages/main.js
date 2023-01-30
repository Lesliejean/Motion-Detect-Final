import Body from "../components/Body.jsx"
import Home from "../components/Nav.jsx"

import { getSession } from "next-auth/react";

function Main() {
  return (
    <div>
      <Home/>
      <Body/>
    </div>
    
  );
};
export default Main;

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

   if (!session) {
     return {
         redirect: {
           destination: '/',
           permanent: false,
         },
     };
   }

   return {
     props: { session },
   };
}