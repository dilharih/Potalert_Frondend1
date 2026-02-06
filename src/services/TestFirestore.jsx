import { collection, addDoc } from "firebase/firestore";
import { db } from "../services/firebase";

export default function TestFirestore() {
  const addTestData = async () => {
    await addDoc(collection(db, "test"), {
      message: "Firebase connected",
      createdAt: Date.now(),
    });
    alert("Data added successfully");
  };

  return <button onClick={addTestData}>Test Firestore</button>;
}
