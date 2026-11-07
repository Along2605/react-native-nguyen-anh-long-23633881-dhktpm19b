import { api } from "../api/client";
import { AppNotification } from "../types";

// BT9.5a: lấy thông báo của user, mới nhất lên đầu
export async function getNotifications(userId: number): Promise<AppNotification[]> {
  const res = await api.get<AppNotification[]>("/notifications", {
    params: { userId, _sort: "createdAt", _order: "desc" },
  });
  return res.data;
}

// BT9.5b: chỉ đổi trường read → dùng PATCH
export async function markAsRead(id: number): Promise<AppNotification> {
  const res = await api.patch<AppNotification>(`/notifications/${id}`, { read: true });
  return res.data;
}