import admin from "firebase-admin";
import axios from "axios";


admin.initializeApp({
credential: admin.credential.applicationDefault()
});


const db = admin.firestore();


async function payPending() {
const snapshot = await db
.collection("withdrawals")
.where("status", "==", "pending")
.get();


for (const doc of snapshot.docs) {
const w = doc.data();


// Aquí llamarías a tu servicio TON real
const fakeTxHash = "TON_TX_" + Date.now();


await doc.ref.update({
status: "paid",
txHash: fakeTxHash
});
console.log("Pagado:", w.wallet, w.amount);
}
}


payPending();