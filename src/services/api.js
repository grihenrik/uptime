const BASE_URL = "http://localhost:4000/api/v1";
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

export const login = async (email, password) => {
  const raw = JSON.stringify({ email, password });
  console.log("Raw: ", raw);
  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  
  const response = await fetch(`${BASE_URL}/auth/login/`, requestOptions)
    .then((response) => response.json())
    .then((result) => result)
    .catch((error) => console.log("error", error));
  
return response.token;
};

export const fetchChecks = async (authToken) => {
  const response = await fetch(`${BASE_URL}/checks`, {
    method: "GET",
    headers: {
      Authorization: `Token ${authToken}`,
    },
  });

  return response.json();
};
