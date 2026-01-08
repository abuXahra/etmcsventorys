
import axios from "axios";
import { useState, useEffect, createContext } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
 
    setLoading(true);
    try {
       const token = localStorage.getItem("token");
    
       if (!token) {
        setUser(null);
        setLoading(false)
        return;
    }

      const res = await axios.get(`${process.env.REACT_APP_URL}/api/auth/me`, {
                                          headers: {
                                            Authorization: `Bearer ${token}`
                                          }
                                    });
      setUser(res.data);
      setPermissions(res.data.permissions)
    } catch (err) {
      console.error("User fetch failed", err);
      setUser(null);
      setPermissions([])
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, permissions, setUser, setPermissions, loading, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
}
