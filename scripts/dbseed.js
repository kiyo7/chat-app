const admin = require('firebase-admin');
const faker = require('faker');
const { date, internet } = require('faker');

// initialization
const projectId = 'chaaaaat-4e459';
const ENVIROMENT = process.env.ENVIRONMENT
  ? process.env.ENVIRONMENT
  : 'emulator';
if (ENVIROMENT === 'emulator') {
  process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
  process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';
}
admin.initializeApp({ projectId });

const db = admin.firestore();
const auth = admin.auth();

let users = [...Array(20).keys()].map(() => {
  return {
    password: internet.password(),
    email: internet.email(),
    displayName: internet.userName(),
    photoURL: faker.image.imageUrl(),
    uid: 0,
  };
});

async function seedDummyData() {
  // ユーザー作成・Auth登録
  try {
    for (let i = 0; i < users.length; i++) {
      await auth.createUser({
        email: users[i].email,
        password: users[i].password,
        displayName: users[i].displayName,
        photoURL: users[i].photoURL,
      });

      await db
        .collection('chat/v1/users')
        .orderBy('createdAt')
        .get()
        .then(async (querySnapshot) => {
          await Promise.all(
            querySnapshot.docs.map(async (doc) => {
              await db
                .collection('chat/v1/users')
                .doc(doc.id)
                .set({
                  ...doc.data(),
                });
            })
          );
        });
    }
    console.log('createUser was successful');
  } catch (error) {
    return Promise.reject(error);
  }
}

seedDummyData();
