export const fetchUser = async function(id) {
  try {
    const response = await fetch(`http://localhost:5000user/${id}`);
    const user = await response.json();
    return user;
  } catch (e) {
    console.error("API request raised an error:", e);
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
    const response = await fetch('http://localhost:5000/user', settings);
    const user = await response.json();
    return user;
  } catch (e) {
    console.error("API request raised an error:", e);
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
    const response = await fetch(`http://localhost:5000user/${id}`, settings);
    const user = await response.json();
    return user;
  } catch (e) {
    console.error("API request raised an error:", e);
  }
};
