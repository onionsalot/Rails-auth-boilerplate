import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { getCurrentUser } from "../../helpers/users-api";

// create context
const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  // the value that will be given to the context
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null);

  // sign out the user, memoized
  const signout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('isLoggedIn');
  }, []);

  const signin = useCallback((user) => {
    setUser(user)
    localStorage.setItem('isLoggedIn', true)
  }, []);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')

    if (!isLoggedIn) { return setLoading(false) }
    const fetchUser = async () => {
      const response = await getCurrentUser()
      if (response && response.data.logged_in) {
        setUser(response.data.user);
      } else {
        setUser(null);
        localStorage.removeItem('isLoggedIn');
      }
      setLoading(false)
    }
    fetchUser()
  }, []);


  // memoize the full context value
  const contextValue = useMemo(() => ({
    loading,
    user,
    signout,
    signin
  }), [loading, user, signout, signin])

  return (
    // the Provider gives access to the context to its children
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  // get the context
  const context = useContext(UserContext);

  // if `undefined`, throw an error
  if (context === undefined) {
    throw new Error("useUserContext was used outside of its Provider");
  }

  return context;
};

export { useUserContext, UserContextProvider };