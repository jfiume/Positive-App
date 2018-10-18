# PositiveApp

[PositiveApp](https://expo.io/@joe007/positiveapp)

PositiveApp is a mobile app built on React Native for iOS and Android by Joe Fiume.
[jfiume.github.io](http://https://github.com/jfiume)

<img src="https://res.cloudinary.com/pancake/image/upload/c_scale,h_600/v1531610435/PositiveApp_MainPage.png" >

## Features

- Users can view their name and a random affirmation
  - Asnyc calls pull affirmations from the database. A users' name is held in the AsyncStorage.
- Users can navigate to different pages
  - React Navigation allows for seamless navigation with cross-platform capabilities. This allows for navigation on both iOS and Android.
  - Users can create a profile, update and delete their profile.
- Users can view more detailed styling
  - All components are styled using Styled Components

  NOTE: feature in progress
  - Users can shake their phone to produce a new affirmation
  - React Native Shake Event allows for commands to be executed upon phone shaking.


## Technology

PositiveApp is mobile app built with Node.js, Express, MongoDB on the backend and React Native and Redux on the frontend.

[Backend](https://github.com/jfiume/PositiveApp/blob/master/docs/backend.md)
[Frontend](https://github.com/jfiume/PositiveApp/blob/master/docs/frontend.md)

## Code Snippets
The following code snippet allows for an array of user objects to be seeded into the database along the route 'user/seed'.
```javascipt
// Seed the database from the above users
router.get('/seed', function(req, res) {
  User.find(function(err, response) {
    for (let j in response) {
      response[j].remove();
    }
  });
  for (let i in users) {
    let newUser = new User({
      name: users[i].name
    });
    newUser.save();
  }
  res.json("database seeded");
});
```
The following code snippet showcases both the AsyncStorage and the React Navigation.
``` javascipt
async _storeData(user) {
  const userId = user.user._id
  try {
    // Saving the current user's ID in the AsyncStorage for the next time they open the app
    await AsyncStorage.setItem('userId', userId);
  } catch (error) {
    // Error saving data
    console.log("AsyncStorage request raised an error:", e);
  }
}

createUserFun() {
 const { name } = this.state;
 // prevents adding a blank name
 if (name === "") {
   return;
 }
 const user = { name: name };
 this.props.createUser(user).then((user) => this._storeData(user));
 // Push to the main page
 this.props.navigation.navigate('PositivePage');
}
```

## npm

Node package manager (npm) is used to install all of the dependencies.

## Future Developments

- Oauth utilizing facebook to create a user profile
- Allowing users to add their own personal affirmations
- Allowing users to block certain affirmations that do not speak to them
