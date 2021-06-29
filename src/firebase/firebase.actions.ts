import firebase from "./firebase";

export const db: any = firebase.firestore();

export interface dataType {
  path: string;
  path2?: string;
  data?: any;
  doc?: string;
  order?: string;
  limit?: number;
  where?: string;
}

export const setData = async ({ path, data, doc, path2 }: dataType) => {
  if (path2) {
    return await db.collection(path).doc(doc).collection(path2).add(data);
  }

  if (doc) {
    return await db.collection(path).doc(doc).set(data);
  }

  return await db.collection(path).add(data);
};

// if you need to order, input to getData(orderName)
// if you need to limit, input to getData(limitCount)

export const getData = async ({
  path,
  doc,
  order,
  limit,
  where,
  path2,
}: dataType) => {
  if (path2) {
    const res = await db
      .collection(path)
      .doc(doc)
      .collection(path2)
      .orderBy(order);
    return fetchData(res);
  }

  if (doc) {
    const res = await db.collection(path).doc(doc);
    const snapshot = await res.get();
    return snapshot.data();
  }
  if (order && limit) {
    const res = await db.collection(path).orderBy(order).limit(limit);
    return fetchData(res);
  }
  if (where) {
    const res = await db
      .collection(path)
      .where("category", "==", parseInt(where))
      .where("accepted", "==", 2);
    return fetchData(res);
  }

  const res = await db.collection(path);
  return fetchData(res);
};

export const fetchData = async (res: any) => {
  const snapshot = await res.get();
  if (snapshot.empty) return [];
  const postData: any = [];
  snapshot.forEach((doc: any) => postData.push({ ...doc.data(), id: doc.id }));
  return postData;
};

export const updateData = async ({ path, doc, data }: dataType) => {
  return await db.collection(path).doc(doc).update(data);
};
