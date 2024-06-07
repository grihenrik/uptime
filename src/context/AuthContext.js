import React, {
  createContext,
  useReducer,
  useEffect,
  useMemo,
  useRef,
} from "react";

const initialState = {
  token: sessionStorage.getItem("token") || null,
};

const authReducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "LOGIN":
      sessionStorage.setItem("token", action.payload);
      return {
        ...state,
        token: action.payload,
      };
    case "LOGOUT":
      sessionStorage.removeItem("token");
      return {
        ...state,
        token: null,
      };
    default:
      return state;
  }
};
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const isMounted = useRef(true);
  useEffect(() => {
    if (isMounted.current) {
      isMounted.current = false;
      return;
    }
    const token = sessionStorage.getItem("token");
    if (token) {
      dispatch({ type: "LOGIN", payload: token });
    }
  }, []);
  const contextValue = useMemo(
    () => ({
      authToken: state.token,
      login: (token) => dispatch({ type: "LOGIN", payload: token }),
      logout: () => dispatch({ type: "LOGOUT" }),
    }),
    [state.token]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
