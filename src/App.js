import logo from './logo.svg';
import {useState} from 'react';
import './App.css';

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child} from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDbd6UrsP7bbnWPQlbXQPwvuIYNjvhCNj8",
  authDomain: "test-a6bca.firebaseapp.com",
  databaseURL: "https://test-a6bca-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "test-a6bca",
  storageBucket: "test-a6bca.appspot.com",
  messagingSenderId: "944941007623",
  appId: "1:944941007623:web:798d5393b7c2472ab3bba2"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase();

const db = getDatabase();

function App() {

  

  const [name , setName] = useState();
  const [age , setAge] = useState();
      
  // Skriver til database
  const Push = () => {
    set(ref(db, 'Person'), {
      name : name,
      age : age,
    }).catch(alert);
  }


  // Leser fra database i Person/name
  // Vil ikke gi data første gang du kjører hvis databasen er tom
  const dbRef = ref(getDatabase());
  get(child(dbRef, 'Person/name')).then((snapshot) => {
  if (snapshot.exists()) {
    console.log(snapshot.val());
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});
  
  


  
  return (
    <div className="App" style={{marginTop : 250}}>
      <center>
      <input placeholder="Enter your name" value={name} 
      onChange={(e) => setName(e.target.value)}/>
      <br/><br/>
      <input placeholder="Enter your age" value={age} 
      onChange={(e) => setAge(e.target.value)}/>
      <br/><br/> 
      <button onClick={Push}>PUSH</button>
      </center>
    </div>
  );
}
  
export default App;
