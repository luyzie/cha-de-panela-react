// Local: src/firebase.ts

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// COLE A SUA CONFIGURAÇÃO (firebaseConfig) AQUI
const firebaseConfig = {
  apiKey: "AIzaSyDmOV3cjMLMqITvT4Pkj7Y5DVhCsIqwQ2k",
  authDomain: "cha-de-panela-2a425.firebaseapp.com",
  projectId: "cha-de-panela-2a425",
  storageBucket: "cha-de-panela-2a425.appspot.com",
  messagingSenderId: "1084033690848",
  appId: "1:1084033690848:web:751fb230943b62951ff485",
  measurementId: "G-V5HTTL4NK2"
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);

//
// 👇👇 ESTA É A LINHA QUE ESTAVA FALTANDO OU ESTÁ ERRADA 👇👇
//
// Certifique-se que o 'export' está aqui!
export const db = getFirestore(app);