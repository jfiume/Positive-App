export const fetchUser = async function(id) {
  try {
    var response = await fetch(`http://localhost:5000/user/${id}`);
    // var response = await fetch(`/user/${id}`);
    const user = await response.json();
    return user;
  } catch (e) {
    console.log("API request raised an error:", e);
  }
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
    var response = await fetch("http://localhost:5000/user", settings)
    // var response = await fetch("/user", settings)
    const user = await response.json();
    return user;
  } catch (e) {
    console.log("API request raised an error:", e);
  }
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
    var response = await fetch(`http://localhost:5000/user/${id}`, settings);
    // var response = await fetch(`/user/${id}`, settings);
    const user = await response.json();
    return user;
  } catch (e) {
    console.log("API request raised an error:", e);
  }
};
