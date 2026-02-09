import express from "express";
import cors from "cors";
import admin from "firebase-admin";


admin.initializeApp({
credential: admin.credential.applicationDefault()
});


const db = admin.firestore();


const app = express();
app.use(cors());
app.use(express.json());


// Registrar usuario
app.post("/register", async (req, res) => {
const { wallet, ref } = req.body;


const userRef = db.collection("users").doc(wallet);
const doc = await userRef.get();


if (!doc.exists) {
await userRef.set({
wallet,
balance: 0,
totalEarned: 0,
referrerId: ref || null,
createdAt: Date.now()
});
}


res.send({ ok: true });
});


// Compra → paga 10% al referrer
app.post("/purchase", async (req, res) => {
const { wallet, amount } = req.body;


const userDoc = await db.collection("users").doc(wallet).get();
const user = userDoc.data();


if (user?.referrerId) {
const bonus = amount * 0.10;


await db.collection("users").doc(user.referrerId).update({
balance: admin.firestore.FieldValue.increment(bonus)
});
}


res.send({ ok: true });
});


// Solicitar retiro
app.post("/withdraw", async (req, res) => {
const { wallet, amount } = req.body;
await db.collection("withdrawals").add({
wallet,
amount,
status: "pending",
createdAt: Date.now()
});


res.send({ ok: true });
});


app.listen(3000, () => console.log("API running on port 3000"));