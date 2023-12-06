// Importing necessary modules from React and Firebase
import { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "./firebase-config"; // Assuming you have a firebase-config file exporting the 'auth' object
import "./App.css";

// Define the main App component
function App() {
  // State variables to handle user input and authentication state
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState<User | null>(null);

  // useEffect hook to listen for changes in authentication state
  useEffect(() => {
    // Subscribe to authentication state changes
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser); // Update the 'user' state with the current user
    });

    // Unsubscribe when the component unmounts
    return () => unsubscribe();
  }, []); // The empty dependency array ensures the effect runs only once on mount

  // Function to handle user registration
  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user); // Log the user object if registration is successful
    } catch {
      console.log("error"); // Log an error if registration fails
    }
  };

  // Function to handle user login
  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user); // Log the user object if login is successful
    } catch {
      console.log("error"); // Log an error if login fails
    }
  };

  // Function to handle user logout
  const logout = async () => {
    await signOut(auth); // Sign out the current user
  };

  // Render the UI with input fields, buttons, and user information
  return (
    <div>
      <div>
        <h3>Register user</h3>
        <input
          placeholder="Email..."
          onChange={(event) => setRegisterEmail(event.target.value)}
        />
        <input
          placeholder="Password..."
          onChange={(event) => setRegisterPassword(event.target.value)}
        />

        <button onClick={register}>Create User</button>
      </div>
      <div>
        <h3>Login</h3>
        <input
          placeholder="Email..."
          onChange={(event) => setLoginEmail(event.target.value)}
        />
        <input
          placeholder="Password..."
          onChange={(event) => setLoginPassword(event.target.value)}
        />

        <button onClick={login}>Login</button>
      </div>
      <h4>User Logged In: {user?.email}</h4>

      <button onClick={logout}>Sign Out</button>
    </div>
  );
}

// Export the App component as the default export
export default App;
