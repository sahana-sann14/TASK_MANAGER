import React, { createContext, useContext, useState } from 'react';

// 1️⃣ Create a context
const RoleContext = createContext();

// 2️⃣ Create a provider
export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState('Admin'); // Default role can be Admin, User, etc.

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
};

// 3️⃣ Create a custom hook to use the context
export const useRole = () => {
  return useContext(RoleContext);
};

// ✅ 4️⃣ Export RoleContext if you're directly importing it elsewhere
export { RoleContext };
