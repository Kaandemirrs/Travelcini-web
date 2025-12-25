import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app, db } from "@/lib/firebase";

function generateInviteCode(length = 6) {
  const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let result = "";

  for (let index = 0; index < length; index += 1) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

async function generateUniqueInviteCode() {
  const groupsRef = collection(db, "groups");

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const inviteCode = generateInviteCode();
    const existingQuery = query(groupsRef, where("inviteCode", "==", inviteCode));
    const existingSnapshot = await getDocs(existingQuery);

    if (existingSnapshot.empty) {
      return inviteCode;
    }
  }

  return generateInviteCode();
}

export async function createGroup(groupName: string, userId: string) {
  if (!groupName.trim()) {
    throw new Error("GROUP_NAME_REQUIRED");
  }

  if (!userId) {
    throw new Error("NOT_AUTHENTICATED");
  }

  const groupsRef = collection(db, "groups");
  const inviteCode = await generateUniqueInviteCode();

  const docRef = await addDoc(groupsRef, {
    name: groupName.trim(),
    inviteCode,
    createdBy: userId,
    members: [userId],
    createdAt: serverTimestamp(),
    lastMessage: null,
  });

  return {
    id: docRef.id,
    inviteCode,
  };
}

export async function joinGroup(inviteCode: string, userId: string) {
  const trimmedCode = inviteCode.trim().toUpperCase();

  if (!trimmedCode) {
    throw new Error("INVITE_CODE_REQUIRED");
  }

  if (!userId) {
    throw new Error("NOT_AUTHENTICATED");
  }

  const groupsRef = collection(db, "groups");
  const groupsQuery = query(groupsRef, where("inviteCode", "==", trimmedCode));
  const snapshot = await getDocs(groupsQuery);

  if (snapshot.empty) {
    throw new Error("INVALID_INVITE_CODE");
  }

  const groupDoc = snapshot.docs[0];

  await updateDoc(groupDoc.ref, {
    members: arrayUnion(userId),
  });

  return {
    id: groupDoc.id,
  };
}

export function getUserGroups(userId: string) {
  if (!userId) {
    throw new Error("NOT_AUTHENTICATED");
  }

  const groupsRef = collection(db, "groups");

  return query(groupsRef, where("members", "array-contains", userId));
}

const storage = getStorage(app);

export async function uploadFile(file: File, path: string) {
  const timestamp = Date.now();
  const safeName = file.name.replace(/[^\w.-]+/g, "_");
  const fullPath = `${path}/${timestamp}_${safeName}`;
  const fileRef = ref(storage, fullPath);

  await uploadBytes(fileRef, file);

  const url = await getDownloadURL(fileRef);

  return url;
}

type MessageType = "text" | "image" | "file";

export async function sendMessage(
  groupId: string,
  userId: string,
  userName: string,
  text: string,
  type: MessageType = "text",
  fileUrl: string | null = null,
) {
  const trimmedText = text.trim();

  if (!groupId) {
    throw new Error("GROUP_ID_REQUIRED");
  }

  if (!userId) {
    throw new Error("NOT_AUTHENTICATED");
  }

  if (type === "text" && !trimmedText) {
    throw new Error("MESSAGE_TEXT_REQUIRED");
  }

  const messagesRef = collection(db, "groups", groupId, "messages");

  const createdAt = serverTimestamp();

  const payload = {
    text: trimmedText,
    readBy: [userId],
    senderId: userId,
    senderName: userName || "",
    createdAt,
    type,
    fileUrl: fileUrl ?? null,
  };

  const messageRef = await addDoc(messagesRef, payload);

  const groupRef = doc(db, "groups", groupId);

  const lastMessageText =
    trimmedText ||
    (type === "image" ? "Photo" : type === "file" ? "File" : "");

  await updateDoc(groupRef, {
    lastMessage: {
      text: lastMessageText,
      createdAt,
    },
  });

  return {
    id: messageRef.id,
  };
}

export function getMessages(groupId: string) {
  if (!groupId) {
    throw new Error("GROUP_ID_REQUIRED");
  }

  const messagesRef = collection(db, "groups", groupId, "messages");

  return query(messagesRef, orderBy("createdAt", "asc"));
}

export async function markMessagesAsRead(groupId: string, userId: string) {
  if (!groupId) {
    throw new Error("GROUP_ID_REQUIRED");
  }

  if (!userId) {
    throw new Error("NOT_AUTHENTICATED");
  }

  const messagesRef = collection(db, "groups", groupId, "messages");
  const messagesQuery = query(messagesRef, orderBy("createdAt", "asc"));
  const snapshot = await getDocs(messagesQuery);

  const batch = writeBatch(db);
  let hasUpdates = false;

  snapshot.forEach((docSnapshot) => {
    const data = docSnapshot.data() as any;
    const readBy: string[] = Array.isArray(data.readBy) ? data.readBy : [];

    if (!readBy.includes(userId)) {
      batch.update(docSnapshot.ref, {
        readBy: arrayUnion(userId),
      });
      hasUpdates = true;
    }
  });

  if (hasUpdates) {
    await batch.commit();
  }
}
