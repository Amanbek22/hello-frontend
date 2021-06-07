import firebase from "./firebase";

export const db: any = firebase.firestore();

export interface dataType {
  path: string;
  data?: any;
  doc?: string;
  order?: string;
  limit?: number;
}

export const setData = async ({ path, data, doc }: dataType) => {
  if (doc) {
    return await db.collection(path).doc(doc).set(data);
  } else {
    return await db.collection(path).add(data);
  }
};

// if you need to order, input to getData(orderName)
// if you need to limit, input to getData(limitCount)
export const getData = async ({ path, doc, order, limit }: dataType) => {
  if (doc) {
    const res = await db.collection(path).doc(doc);
    const snapshot = await res.get();
    return snapshot.data();
  } else {
    const res =
      order && limit
        ? await db.collection(path).orderBy(order).limit(limit)
        : await db.collection(path);
    const snapshot = await res.get();
    if (snapshot.empty) return [];
    const postData: any = [];
    snapshot.forEach((doc: any) =>
      postData.push({ ...doc.data(), id: doc.id }),
    );
    return postData;
  }
};

export const updateData = async ({ path, doc, data }: dataType) => {
  return await db.collection(path).doc(doc).update(data);
};
