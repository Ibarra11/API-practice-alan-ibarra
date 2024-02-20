import React, { useContext } from "react";

const AuthContext = React.createContext();

export function useAuthContext() {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("Must be used within an auth provider");
  }
  return auth;
}

export default function AuthProvider({ children }) {
  const [auth, setAuth] = React.useState({ accessToken: null });
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
