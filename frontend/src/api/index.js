export async function createUser(data) {
  const response = await fetch(
    import.meta.env.VITE_API_URL + "/user/signup",
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const resData = await response.json();
  if (!response.ok) {
    const errorMessage = resData.errors[0]?.msg;
    throw new Error(errorMessage);
  }

  return resData;
}


export async function loginUser(data) {
  const response = await fetch(
    import.meta.env.VITE_API_URL + "/user/login",
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const resData = await response.json();
  if (!response.ok) {
    const errorMessage = resData.errors[0]?.msg;
    throw new Error(errorMessage);
  }

  return resData
}