import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [

    //custom credential provider
    CredentialsProvider({
      id: 'credentials',
      name: 'motion',
      credentials: {
        username: { label: 'username', type: 'text', },
        password: { label: 'Password', type: 'password' }
      },
          
      async authorize(credentials, req) {

        const username = credentials.username;
        const password = credentials.password

        const response = await fetch('http://localhost:3001/authenticate', {
          method: 'POST',
          body: JSON.stringify({ username, password }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        
        console.log(response)
        if (!response.ok) {
          throw new Error(data.message);
        } 
        if (response.ok && data) {
          return data;
        }

        // Return null if user data could not be retrieved
        return null
      },
    }),
  ],  
  pages: {
    signIn: "/components/Login",
  },
  secret:  process.env.JWT_SECRET,
}

export default NextAuth(authOptions)