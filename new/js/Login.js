//כניסה
function login() {
  var User_name = document.getElementById("txt-input").value;
  var Password = document.getElementById("pwd").value;
  if (User_name == '' || Password == '') {
     alert('did you entered username & password?')
    return; }
  var retrievedObject = localStorage.getItem('object');
  var exsist_user = false;
  console.log(retrievedObject)
  if (retrievedObject != null) {
    var retrievedObjectJSON = JSON.parse(retrievedObject);
    retrievedObjectJSON.forEach(element => {
      if (element.userName == User_name && element.pass == Password) {
        exsist_user = true;
        alert('welcome back!')
        window.location.href = "./Main_Page.html";
        return;
      }

    });
  }
  if (!exsist_user)
    alert('Sorry, but you need to sign up')
}

//רישום
function signUp() {
  var User_name = document.getElementById("txt-input").value;
  var Password = document.getElementById("pwd").value;
  var item = { "userName": User_name, "pass": Password };

  var retrievedObject = localStorage.getItem('object');
  if (User_name == '' || Password == '') {
    alert('did you entered username & password?')
   return; }
  if (retrievedObject == null) {
    localStorage.setItem('object', JSON.stringify([item]));
    alert('You have successfully registered!');
    var url = "Main_Page.html";
    window.location = url;
  }

  //למקרה שהמשתמש הינו הראשון שנרשם
  else {
    var not_unique = false;
    var retrievedObjectJSON = JSON.parse(retrievedObject);
    retrievedObjectJSON.forEach(element => {

      //בדיקה האם קיים משתמש בשם זה
      if (element.userName == User_name ) {
        not_unique = true;
        alert('this user_name is exist!')
        return;
      }
    });

    //אם לא קיים משתמש באותו השם
    if (!not_unique) {
      retrievedObjectJSON.push(item);
      localStorage.setItem('object', JSON.stringify(retrievedObjectJSON));
      alert('You have successfully registered!')
      var url = "Main_Page.html";
      window.location = url;
    }
  }
}