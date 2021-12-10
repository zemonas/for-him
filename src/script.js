const firebaseConfig = {
  apiKey: "AIzaSyCm6FHVXNB0xlKudJuvuAjMN7RzZ26FUHU",
  authDomain: "for-her-wish.firebaseapp.com",
  databaseURL:
    "https://for-her-wish-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "for-her-wish",
  storageBucket: "for-her-wish.appspot.com",
  messagingSenderId: "491286059052",
  appId: "1:491286059052:web:6b53ee8f21f6650d9b5989",
  measurementId: "${config.measurementId}",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

$(document).ready(function () {
  $(".btn").click(function () {
    if (Led1Status == "1") {
      // post to firebase
      firebaseRef.set("0");
      Led1Status = "0";
    } else {
      firebaseRef.set("1");
      Led1Status = "1";
    }
  });
  var database = firebase.database();
  var Led1Status = 0;
  var firebaseRef = firebase.database().ref().child("Led1Status");
  setInterval(() => {
    database.ref().on("value", function (snap) {
      Led1Status = snap.val().Led1Status;
      if (Led1Status == "1") {
        setTimeout(() => {
          try {
            $("#mp3")[0].play();
          } catch (e) {
            console.log(e);
          }
          firebaseRef.set("0");
        }, 300);
        // check from the firebase
        //$(".Light1Status").text("The light is off");
        console.log("The light is off");
      } else {
        //$(".Light1Status").text("The light is on");
        console.log("The light is on");
      }
    });
  }, 500);
});
