import firebase from "firebase/app";

export const db: any = firebase.firestore();

export interface dataType {
  path: string;
  data?: any;
  doc?: string;
}

export const setData = async ({ path, data, doc }: dataType) => {
  if (doc) {
    return await db.collection(path).doc(doc).set(data);
  } else {
    return await db.collection(path).add(data);
  }
};

export const getData = async ({ path, doc }: dataType) => {
  if (doc) {
    const res = await db.collection(path).doc(doc);
    const snapshot = await res.get();
    return snapshot.data();
  } else {
    const res = await db.collection(path);
    const snapshot = await res.get();
    const postData: any = [];
    if (snapshot.empty) return postData;
    snapshot.forEach((doc: any) =>
      postData.push({ ...doc.data(), id: doc.id }),
    );
    return postData;
  }
};

export const updateData = ({}: dataType) => {};
