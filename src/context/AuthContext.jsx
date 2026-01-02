import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const[searchBar,setSearchBar] = useState('')

  useEffect(() => {
    const storedUser = localStorage.getItem("userName");
    const storedUserId = localStorage.getItem("userId");
    const storedRole = localStorage.getItem("role");

    if (storedUser && storedUserId) {
      setUser({ name: storedUser, id: storedUserId, role: storedRole });
    }
  }, []);

  const login = (name, id, role) => {
  localStorage.setItem("userName", name);
  localStorage.setItem("userId", id);
  localStorage.setItem("role", role);
  setUser({ name, id, role });
};

  const logout = () => {
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    setUser(null);
  };

  return (
    <>
      <AuthContext.Provider value={{ user, login, logout,searchBar,setSearchBar}}>
        {children}
      </AuthContext.Provider>
    </>
  );
}
