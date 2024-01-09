const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} = require("firebase-admin/firestore");
const serviceAccount = require("./fb-messenger-chatbot-webhook-2be2a973ac3f.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

async function addHistory(senderId, msg) {
  const docRef = db.collection("history").doc(senderId);

  await docRef.collection("histories").add({
    senderId,
    message: msg,
    createDate: new Date(),
  });
}

async function getHistory(senderId) {
  const querySnapshot = await db
    .collection("history")
    .doc(senderId)
    .collection("histories")
    .get();
  const histories = [];
  querySnapshot.forEach((doc) => {
    const messageData = doc.data();
    histories.push({
      role: messageData.senderId,
      parts: [{ text: messageData.message }],
    });
  });
  return histories;
}
