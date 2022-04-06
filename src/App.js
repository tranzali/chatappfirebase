import './App.css';
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'

firebase.initializeApp({
  apiKey: "AIzaSyCkBpqhx1WCCxR6UT-_ICAPvDerrk-M5sk",
  authDomain: "chatapp-adab6.firebaseapp.com",
  projectId: "chatapp-adab6",
  storageBucket: "chatapp-adab6.appspot.com",
  messagingSenderId: "823314287883",
  appId: "1:823314287883:web:54fcc7b7e1276969b3e60e"
})

const auth = firebase.auth()
const firestore = firebase.firestore()

function App() {

  const [user] = useAuthState()

  return (
    <div className="App">
      <header className="App-header">
        
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn /> }
      </section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()
    auth.signInWithGoogle(provider)
  }

  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

function ChatRoom() {

}

export default App;
