import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

/**
 * Creates a pothole document in Firestore
 * Firestore will AUTO-create the `potholes` collection
 */
export const createPothole = async ({
  lat,
  lng,
  severity,
  description,
  reportedBy,
}) => {
  return await addDoc(collection(db, "potholes"), {
    lat,
    lng,
    severity,            // "low" | "medium" | "high"
    description,
    status: "open",      // default status
    reportedBy,          // UID
    createdAt: serverTimestamp(), // Firebase server time
  });
};
