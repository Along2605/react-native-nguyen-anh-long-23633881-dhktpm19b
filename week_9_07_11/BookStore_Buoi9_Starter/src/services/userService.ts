import { api } from "../api/client";
import { User } from "../types";

// BT9.4: PATCH chỉ gửi { name, phone } → các trường khác trong db.json giữ nguyên
export async function updateProfile(id: number, data: Pick<User, "name" | "phone">): Promise<User> {
  const res = await api.patch<User & { password?: string }>(`/users/${id}`, data);
  const { password: _pw, ...user } = res.data; // bỏ mật khẩu, không đưa vào store
  return user;
}