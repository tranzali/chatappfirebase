import './App.css'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'
import { GoogleAuthProvider } from 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { useRef, useState } from 'react'

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

  const [user] = useAuthState(auth)

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
    const provider = new GoogleAuthProvider()
    auth.signInWithGoogle(provider)
  }

  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom() {
  const dummy = useRef()

  const messagesRef = firestore.collection('messages')
  const query = messagesRef.orderBy('createdAt').limit(25)

  const [messages] = useCollectionData(query, {idField: 'id'})

  const [formValue, setFormValue] = useState("")

  const sendMessage = async(e) => {
    e.preventDefault()
    const { uid, photoURL } = auth.currentUser
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('')

    dummy.current.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <main>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
        
        <div ref={dummy}></div>
      </main>

      <form onSubmit={sendMessage}>

        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />

        <button type="submit">Submit</button>

      </form>
    </>
  )
}

function ChatMessage(props){
  const { text, uid, photoURL } = props.message

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received'

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL} alt="" />
      <p>{text}</p>
    </div>
  )
}

export default App;
