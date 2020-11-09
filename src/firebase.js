import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDklqeknBwWWoUQdZDNMvxoJTYaa9hj95M",
  authDomain: "notasestudiates.firebaseapp.com",
  databaseURL: "https://notasestudiates.firebaseio.com",
  projectId: "notasestudiates",
  storageBucket: "notasestudiates.appspot.com",
  messagingSenderId: "4359422220",
  appId: "1:4359422220:web:5dfee0e7c31d25745cc929"
};/*
var firebaseConfig = {
  apiKey: "AIzaSyD5Zgp6ev7WbL_I_cSVKP7KzvDixdlc04I",
  authDomain: "taller3-c8a96.firebaseapp.com",
  databaseURL: "https://taller3-c8a96.firebaseio.com",
  projectId: "taller3-c8a96",
  storageBucket: "taller3-c8a96.appspot.com",
  messagingSenderId: "621103704772",
  appId: "1:621103704772:web:487baf885c412a87327791"
};*/

  // Initialize Firebase
 /* var fireDB=firebase.initializeApp(firebaseConfig);
  export default fireDB.database().ref();*/

// Initialize Firebase
//firebase.initializeApp(firebaseConfig);



const fb = firebase.initializeApp(firebaseConfig);
export const db = fb.firestore();
export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Representa el proveedor de autenticación de inicio de sesión de Google.
// Utilice esta clase para obtener
const provider = new firebase.auth.GoogleAuthProvider();

//Para acceder con una ventana emergente, llama a signInWithPopup
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  //En algunos casos, puede ser útil crear una referencia de documento con un ID 
  //generado automáticamente y, luego, usar la referencia más adelante. 
  //Para este caso práctico, puedes llamar a doc():
  const userRef = firestore.doc(`users/${user.uid}`);

  // Para obetner el registro creado
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      // Para crear o reemplazar un solo documento, usa el método set()
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData
      });
    } catch (error) {
      console.error("Error crear el usuario", error);
    }
  }
  return getUserDocument(user.uid);
};

// getUserDocument , consulta un registro por medio del id
const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error extraer usuario", error);
  }
};
