 export
 async function registeruser ({request, name, lastname, phoneNumber, useremail, username, password}){
     return await request.post(
    "http://localhost:5173/api/auth/register",
    {
      data: {
        firstname: name,
        lastname: lastname,
        phoneNumber: phoneNumber,
        email: useremail,
        username: username,
        password: password,
        role: "USER",
      },
    },
  );

}

