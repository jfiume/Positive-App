export const fetchUser = async function(id) {
  try {
    // const response = await fetch(`http://localhost:5000/api/user/${id}`);
    const response = await fetch(`https://positive-app-backend.herokuapp.com/api/user/${id}`);
    const user = await response.json();
    return user;
  } catch (e) {
    console.log("API request raised an error:", e);
  };
};

export const createUser = async function(name) {
  try {
    const settings = {
      method: 'POST',
      body: JSON.stringify(name),
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
    // const response = await fetch("http://localhost:5000/api/user", settings)
    const response = await fetch("https://positive-app-backend.herokuapp.com/api/user", settings)
    const user = await response.json();
    return user;
  } catch (e) {
    console.log("API request raised an error:", e);
  };
};

export const updateUser = async function(id, name) {
  try {
    const settings = {
      method: 'PUT',
      body: JSON.stringify(name),
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
    // const response = await fetch(`http://localhost:5000/api/user/${id}`, settings);
    const response = await fetch(`https://positive-app-backend.herokuapp.com/api/user/${id}`, settings);
    const user = await response.json();
    return user;
  } catch (e) {
    console.log("API request raised an error:", e);
  };
};

export const deleteUser = async function(id) {
  try {
    const settings = {
      method: 'DELETE',
      headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
    // const response = await fetch("http://localhost:5000/api/user", settings)
    const response = await fetch(`https://positive-app-backend.herokuapp.com/api/user/${id}`, settings)
  } catch (e) {
    console.log("API request raised an error:", e);
  };
};
