import Login from "../components/Login.jsx";
import { getSession, getCsrfToken } from "next-auth/react";
import { useSession, signIn, signOut } from "next-auth/react";

const LoginForm = () => {
  return(
    <div>
      <Login/>
    </div>
  );
};

export default LoginForm;

// export async function getServerSideProps(context) {
// 	const { req } = context;
//  	const session = await getSession({ req });

//   	if (session) {
//     	return {
//       		redirect: { destination: "/main" },
//     	};
//   	}
// 	return {
// 		props: {
// 			csrfToken: await getCsrfToken(context),
// 		},
// 	}
// }