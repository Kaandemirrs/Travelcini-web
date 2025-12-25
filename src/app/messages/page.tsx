"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { onSnapshot } from "firebase/firestore";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/context/AuthContext";
import {
  createGroup,
  getMessages,
  getUserGroups,
  joinGroup,
  markMessagesAsRead,
  sendMessage,
  uploadFile,
} from "@/services/groupService";
import CreateGroupModal from "@/components/messages/CreateGroupModal";
import JoinGroupModal from "@/components/messages/JoinGroupModal";
import { Check, CheckCheck, Copy, Paperclip, Smile } from "lucide-react";

type Message = {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  createdAt?: {
    seconds: number;
    nanoseconds: number;
  };
  type: "text" | "image" | "file";
  fileUrl?: string | null;
  readBy: string[];
};

type Group = {
  id: string;
  name: string;
  lastMessage: string;
  lastTime: string;
  members: string[];
  inviteCode: string;
};

function formatMessageTime(
  timestamp:
    | {
        seconds: number;
        nanoseconds: number;
      }
    | undefined,
) {
  if (!timestamp?.seconds) {
    return "";
  }

  const date = new Date(timestamp.seconds * 1000);

  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function MessagesPage() {
  const { user, userData } = useAuth();
  const [groups, setGroups] = useState<Group[]>([]);
  const [loadingGroups, setLoadingGroups] = useState(false);
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [uploading, setUploading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showInviteCard, setShowInviteCard] = useState(false);
  const [inviteCopied, setInviteCopied] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement | null>(null);
  const emojiButtonRef = useRef<HTMLButtonElement | null>(null);
  const inviteCardRef = useRef<HTMLDivElement | null>(null);
  const inviteButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!user) {
      setGroups([]);
      setActiveGroupId(null);
      return;
    }

    setLoadingGroups(true);

    const groupsQuery = getUserGroups(user.uid);

    const unsubscribe = onSnapshot(
      groupsQuery,
      (snapshot) => {
        const next: Group[] = [];

        snapshot.forEach((docSnapshot) => {
          const data = docSnapshot.data() as any;
          const createdAt = data.createdAt;

          let lastTime = "";

          if (createdAt?.seconds) {
            const date = new Date(createdAt.seconds * 1000);
            lastTime = date.toLocaleDateString();
          }

          const lastMessageText = data.lastMessage?.text || "Yeni grup, henüz mesaj yok.";

          next.push({
            id: docSnapshot.id,
            name: data.name ?? "Untitled group",
            lastMessage: lastMessageText,
            lastTime,
            members: Array.isArray(data.members) ? data.members : [],
            inviteCode: data.inviteCode ?? "",
          });
        });

        next.sort((a, b) => a.name.localeCompare(b.name));

        setGroups(next);

        setActiveGroupId((current) => {
          if (current && next.some((group) => group.id === current)) {
            return current;
          }

          if (next.length > 0) {
            return next[0].id;
          }

          return null;
        });

        setLoadingGroups(false);
      },
      () => {
        setLoadingGroups(false);
        window.alert(
          "Gruplar yüklenirken bir sorun oluştu. Lütfen sayfayı yenileyin.",
        );
      },
    );

    return unsubscribe;
  }, [user]);

  const activeGroup = groups.find((group) => group.id === activeGroupId) ?? null;

  useEffect(() => {
    if (!activeGroupId) {
      setMessages([]);
      return;
    }

    setMessages([]);

    const messagesQuery = getMessages(activeGroupId);

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const next: Message[] = snapshot.docs.map((docSnapshot) => {
        const data = docSnapshot.data() as any;
        const type = (data.type as Message["type"]) || "text";

        return {
          id: docSnapshot.id,
          text: data.text ?? "",
          senderId: data.senderId ?? "",
          senderName: data.senderName ?? "",
          createdAt: data.createdAt,
          type,
          fileUrl: data.fileUrl ?? null,
          readBy: Array.isArray(data.readBy) ? data.readBy : [],
        };
      });

      setMessages(next);
    });

    return unsubscribe;
  }, [activeGroupId]);

  useEffect(() => {
    if (!messagesContainerRef.current) {
      return;
    }

    const container = messagesContainerRef.current;
    container.scrollTop = container.scrollHeight;
  }, [messages, activeGroupId]);

  useEffect(() => {
    if (!showEmojiPicker) {
      return;
    }

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node | null;

      if (
        !target ||
        emojiPickerRef.current?.contains(target) ||
        emojiButtonRef.current?.contains(target)
      ) {
        return;
      }

      setShowEmojiPicker(false);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmojiPicker]);

  useEffect(() => {
    if (!showInviteCard) {
      return;
    }

    const handleClickOutsideCard = (event: MouseEvent) => {
      const target = event.target as Node | null;

      if (
        !target ||
        inviteCardRef.current?.contains(target) ||
        inviteButtonRef.current?.contains(target)
      ) {
        return;
      }

      setShowInviteCard(false);
    };

    document.addEventListener("mousedown", handleClickOutsideCard);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsideCard);
    };
  }, [showInviteCard]);

  useEffect(() => {
    if (!user || !activeGroupId || messages.length === 0) {
      return;
    }

    const currentUserId = user.uid;
    const hasUnread = messages.some(
      (message) => !message.readBy.includes(currentUserId),
    );

    if (!hasUnread) {
      return;
    }

    markMessagesAsRead(activeGroupId, currentUserId).catch(() => {});
  }, [messages, user, activeGroupId]);

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setDraft((previous) => previous + emojiData.emoji);
  };

  const handleCopyInvite = async () => {
    if (!activeGroup?.inviteCode) {
      return;
    }

    try {
      await navigator.clipboard.writeText(activeGroup.inviteCode);
      setInviteCopied(true);
      window.setTimeout(() => {
        setInviteCopied(false);
      }, 1500);
    } catch {
    }
  };

  const handleCreateGroup = async (groupName: string) => {
    if (!user) {
      throw new Error("NOT_AUTHENTICATED");
    }

    await createGroup(groupName, user.uid);
  };

  const handleJoinGroup = async (inviteCode: string) => {
    if (!user) {
      throw new Error("NOT_AUTHENTICATED");
    }

    await joinGroup(inviteCode, user.uid);
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!activeGroupId) {
      window.alert("Lütfen önce bir grup seçin.");
      event.target.value = "";
      return;
    }

    if (!user) {
      window.alert("Dosya göndermek için önce giriş yapmalısınız.");
      event.target.value = "";
      return;
    }

    setUploading(true);

    try {
      const senderName = userData?.displayName || user.email || "";
      const path = `chat-uploads/${activeGroupId}`;
      const url = await uploadFile(file, path);

      const isImage = file.type.startsWith("image/");
      const messageType: Message["type"] = isImage ? "image" : "file";
      const textForMessage = messageType === "file" ? file.name : "";

      await sendMessage(
        activeGroupId,
        user.uid,
        senderName,
        textForMessage,
        messageType,
        url,
      );
    } catch {
      window.alert(
        "Dosya yüklenirken bir sorun oluştu. Lütfen tekrar deneyin.",
      );
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const handleSendMessage = async () => {
    const trimmed = draft.trim();

    if (!trimmed || !activeGroupId) {
      return;
    }

    if (!user) {
      window.alert("Mesaj göndermek için önce giriş yapmalısınız.");
      return;
    }

    const senderName = userData?.displayName || user.email || "";

    try {
      await sendMessage(activeGroupId, user.uid, senderName, trimmed, "text", null);
      setDraft("");
    } catch {
      window.alert(
        "Mesaj gönderilirken bir sorun oluştu. Lütfen tekrar deneyin.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        <section className="bg-white">
          <div className="mx-auto flex h-[calc(100vh-80px-72px)] max-w-6xl flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-50/80 px-0 py-4 shadow-[0_30px_80px_rgba(0,0,0,0.12)] md:h-[calc(100vh-80px-80px)] md:px-3">
            <div className="grid h-full min-h-0 w-full grid-cols-1 gap-0 md:grid-cols-[minmax(280px,340px)_minmax(0,1fr)]">
              <aside className="flex h-full flex-col border-b border-neutral-200 bg-white md:border-b-0 md:border-r">
                <div className="flex items-center justify-between gap-3 border-b border-neutral-200 px-4 py-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0073D9]">
                      Messaging
                    </p>
                    <h1 className="text-lg font-semibold text-[#111827]">Messages</h1>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setCreateModalOpen(true)}
                      className="inline-flex h-9 items-center justify-center rounded-full bg-[#0073D9] px-3 text-xs font-semibold text-white shadow-md shadow-[#0073D9]/40 transition hover:bg-[#005fb1]"
                    >
                      +
                      <span className="ml-1 hidden md:inline">New group</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setJoinModalOpen(true)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-xs font-semibold text-neutral-600 shadow-sm hover:bg-neutral-50"
                    >
                      ⇢
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                  {loadingGroups && (
                    <div className="px-4 py-3 text-xs text-neutral-400">
                      Gruplarınız yükleniyor...
                    </div>
                  )}
                  {!loadingGroups && groups.length === 0 && (
                    <div className="px-4 py-3 text-xs text-neutral-500">
                      Henüz bir mesaj grubu yok. Yeni bir grup oluşturarak başlayın.
                    </div>
                  )}
                  {groups.map((group) => {
                    const isActive = group.id === activeGroupId;

                    return (
                      <button
                        key={group.id}
                        type="button"
                        onClick={() => setActiveGroupId(group.id)}
                        className={`flex w-full items-center justify-between gap-3 border-b border-neutral-100 px-4 py-3 text-left text-sm transition ${
                          isActive
                            ? "bg-[#E0F2FE] text-[#0F172A]"
                            : "bg-white hover:bg-neutral-50 text-neutral-800"
                        } md:bg-transparent`}
                      >
                        <div className="flex flex-1 flex-col">
                          <span className="max-w-[220px] truncate text-[13px] font-semibold text-[#111827]">
                            {group.name}
                          </span>
                          <span className="mt-0.5 line-clamp-1 text-xs text-neutral-500">
                            {group.lastMessage}
                          </span>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-[11px] text-neutral-400">
                            {group.lastTime}
                          </span>
                          {isActive && (
                            <span className="h-1.5 w-1.5 rounded-full bg-[#0073D9]" />
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </aside>

              <section
                className={`relative flex h-full min-h-0 flex-col bg-gradient-to-br from-[#EFF6FF] via-[#F9FAFB] to-[#E0F2FE] ${
                  !activeGroup ? "items-center justify-center" : ""
                }`}
              >
                {!activeGroup && (
                  <div className="m-auto flex flex-col items-center justify-center text-center text-sm text-neutral-500">
                    <p className="text-base font-medium text-neutral-700">
                      Select a group to start chatting
                    </p>
                    <p className="mt-1 max-w-xs text-xs text-neutral-500">
                      Pick one of your groups on the left to see messages and start the
                      conversation.
                    </p>
                  </div>
                )}

                {activeGroup && (
                  <div className="flex h-full min-h-0 flex-col">
                    <div className="flex items-center justify-between border-b border-white/40 bg-white/60 px-4 py-3 backdrop-blur">
                      <div>
                        <h2 className="text-sm font-semibold text-[#111827]">
                          {activeGroup.name}
                        </h2>
                        <p className="text-[11px] text-neutral-500">
                          {activeGroup.members.length}{" "}
                          {activeGroup.members.length === 1 ? "member" : "members"} •
                          Planning together in TravelCini
                        </p>
                      </div>
                      <button
                        type="button"
                        ref={inviteButtonRef}
                        onClick={() => setShowInviteCard((previous) => !previous)}
                        className="inline-flex items-center justify-center rounded-full bg-[#F1A501] px-3 py-1.5 text-xs font-semibold text-white shadow-md shadow-[#F1A501]/40 transition hover:bg-[#d89000]"
                      >
                        Invite
                      </button>
                    </div>

                    {showInviteCard && (
                      <div
                        ref={inviteCardRef}
                        className="absolute right-4 top-16 z-20 w-64 rounded-2xl border border-neutral-200 bg-white p-3 shadow-lg"
                      >
                        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-400">
                          Invite code
                        </p>
                        <div className="mt-2 flex items-center justify-between gap-2">
                          <span className="max-w-[150px] truncate font-mono text-sm text-[#111827]">
                            {activeGroup.inviteCode}
                          </span>
                          <button
                            type="button"
                            onClick={handleCopyInvite}
                            className="inline-flex h-7 items-center gap-1 rounded-full bg-[#0073D9] px-2 text-[11px] font-semibold text-white shadow-sm transition hover:bg-[#005fb1]"
                          >
                            {inviteCopied ? (
                              <>
                                <Check className="h-3 w-3" />
                                <span>Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        </div>
                        <p className="mt-2 text-[11px] text-neutral-500">
                          Share this code to invite others to the group.
                        </p>
                      </div>
                    )}

                    <div
                      ref={messagesContainerRef}
                      className="flex-1 overflow-y-auto px-3 py-3 sm:px-4 sm:py-4"
                    >
                      <div className="flex flex-col gap-2 text-sm">
                        {messages.map((message) => {
                          const isMe = message.senderId === user?.uid;
                          const timeLabel = formatMessageTime(message.createdAt);
                          const readCount = message.readBy.length;

                          let content: JSX.Element | null = null;

                          if (message.type === "image" && message.fileUrl) {
                            content = (
                              <a
                                href={message.fileUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="block"
                              >
                                <img
                                  src={message.fileUrl}
                                  alt={message.text || "Shared image"}
                                  className="mt-0.5 max-h-64 w-auto max-w-full rounded-xl object-cover"
                                />
                              </a>
                            );
                          } else if (message.type === "file" && message.fileUrl) {
                            const label = message.text || "Download file";

                            content = (
                              <a
                                href={message.fileUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex max-w-full items-center gap-2 text-xs font-medium text-[#0073D9]"
                              >
                                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#E0F2FE] text-[10px] text-[#0073D9]">
                                  ↓
                                </span>
                                <span className="max-w-[180px] truncate">
                                  {label}
                                </span>
                              </a>
                            );
                          } else {
                            content = (
                              <p className="whitespace-pre-line">{message.text}</p>
                            );
                          }

                          return (
                            <div
                              key={message.id}
                              className={`flex w-full ${
                                isMe ? "justify-end" : "justify-start"
                              }`}
                            >
                              <div
                                className={`max-w-[75%] rounded-2xl px-3 py-2 text-xs sm:text-sm ${
                                  isMe
                                    ? "rounded-br-sm bg-[#0073D9] text-white"
                                    : "rounded-bl-sm bg-white text-neutral-800 shadow-sm shadow-black/5"
                                }`}
                              >
                                {!isMe && message.senderName && (
                                  <p className="mb-0.5 text-[10px] font-semibold uppercase tracking-wide text-neutral-400">
                                    {message.senderName}
                                  </p>
                                )}
                                {content}
                                <div className="mt-1 flex items-center justify-end gap-1 text-[10px]">
                                  <span
                                    className={
                                      isMe ? "text-white/70" : "text-neutral-400"
                                    }
                                  >
                                    {timeLabel}
                                  </span>
                                  {isMe && (
                                    <span className="flex items-center">
                                      {readCount === 0 && (
                                        <Check className="h-3 w-3 text-neutral-300" />
                                      )}
                                      {readCount === 1 && (
                                        <CheckCheck className="h-3 w-3 text-neutral-300" />
                                      )}
                                      {readCount > 1 && (
                                        <CheckCheck className="h-3 w-3 text-[#22C55E]" />
                                      )}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {showEmojiPicker && (
                      <div
                        ref={emojiPickerRef}
                        className="absolute bottom-16 right-4 z-20 rounded-2xl border border-neutral-200 bg-white shadow-lg"
                      >
                        <EmojiPicker onEmojiClick={handleEmojiClick} />
                      </div>
                    )}

                    <div className="border-t border-white/40 bg-white/70 px-3 py-2 backdrop-blur-sm sm:px-4 sm:py-3">
                      <form
                        className="flex items-center gap-2"
                        onSubmit={(event) => {
                          event.preventDefault();
                          handleSendMessage();
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={uploading}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 shadow-sm transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <Paperclip className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          ref={emojiButtonRef}
                          onClick={() => setShowEmojiPicker((previous) => !previous)}
                          disabled={uploading}
                          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 shadow-sm transition hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <Smile className="h-4 w-4" />
                        </button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <input
                          value={draft}
                          onChange={(event) => setDraft(event.target.value)}
                          placeholder="Write a message..."
                          className="flex-1 rounded-full border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-800 placeholder:text-neutral-400 focus:border-[#0073D9] focus:outline-none focus:ring-2 focus:ring-[#0073D9]/10"
                        />
                        <button
                          type="submit"
                          disabled={!activeGroupId || uploading}
                          className="inline-flex items-center justify-center rounded-full bg-[#0073D9] px-4 py-2 text-xs font-semibold text-white shadow-md shadow-[#0073D9]/40 transition hover:bg-[#005fb1] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          Send
                        </button>
                      </form>
                    </div>
                  </div>
                )}

                {!activeGroup && (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden bg-gradient-to-t from-[#E5E7EB] via-transparent to-transparent opacity-70 md:block" />
                )}
              </section>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <CreateGroupModal
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreate={handleCreateGroup}
      />
      <JoinGroupModal
        open={joinModalOpen}
        onClose={() => setJoinModalOpen(false)}
        onJoin={handleJoinGroup}
      />
    </div>
  );
}
