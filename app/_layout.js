import { Stack } from 'expo-router';
import { useState } from 'react';
import UserContext from "@context/user-context.js";

export default function Layout() {
  const [user, setUser] = useState({});

  return <UserContext.Provider value={{user, setUser}}>
    <Stack screenOptions={{
      headerShown: false,
    }} />
  </UserContext.Provider>
}
