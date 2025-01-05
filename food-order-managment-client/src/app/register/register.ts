type RegisterPayload = {
    phoneNumber: string;
    password: string;
    role: string;
  };
  
  const registerAxios = async (payload: RegisterPayload) => {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  
    if (!response.ok) {
      throw new Error("Registration failed");
    }
  
    return response.json();
  };
  
  export default registerAxios;