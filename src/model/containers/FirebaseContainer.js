const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
const serviceAccount = require("../../db/firebase/firebase.config.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

class FirebaseDB {
    constructor(collection) {
        const db = getFirestore();
        this.query = db.collection(`${collection}`);
    }

    async get(id) {
        try {
            const docRef = this.query.doc(`${id}`);
            const doc = await docRef.get();

            return {
                id: doc.id,
                ...doc.data()
            };
        } catch (error) {
            throw new Error(`Hubo un error: ${error.message}`);
        }
    }

    async getAll() {
        try {
            const querySnapshot = await this.query.get();
            const docs = querySnapshot.docs;

            return docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            throw new Error(`Hubo un error: ${error.message}`);
        }
    }

    async create(data) {
        try {
            const docRef = this.query.doc();

            return await docRef.set(data);
        } catch (error) {
            throw new Error(`Hubo un error: ${error.message}`);
        }
    }

    async update(id, data) {
        try {
            const docRef = this.query.doc(`${id}`);

            return await docRef.update(data);
        } catch (error) {
            throw new Error(`Hubo un error: ${error.message}`);
        }
    }

    async delete(id) {
        try {
            const docRef = this.query.doc(`${id}`);
            
            return await docRef.delete();
        } catch (error) {
            throw new Error(`Hubo un error: ${error.message}`);
        }
    }
}

module.exports = FirebaseDB;