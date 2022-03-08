import { useContext, createContext } from "react";

export const UserContext = createContext(null);

export function useUserContext() {
  return useContext(UserContext);
}

// import { createContext, useContext } from "react";

// const UserContext = createContext();

// // export function AppWrapper({ children }) {
// //   let sharedState = {
// //     /* whatever you want */
// //   };

// //   return (
// //     <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
// //   );
// // }

// export function useUserContext() {
//   return useContext(UserContext);
// }
