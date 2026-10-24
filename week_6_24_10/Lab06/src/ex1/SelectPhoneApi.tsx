import React, { useCallback, useEffect, useState } from "react";
import { fetchPhone } from "../api/phoneApi";
import { ErrorBox } from "../components/ErrorBox";
import { Loading } from "../components/Loading";
import { Phone } from "../types";
import { SelectPhoneApp } from "./SelectPhoneApp";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

// Bài 2: lấy sản phẩm từ API rồi dùng lại toàn bộ Bài 1
export function SelectPhoneApi() {
  const [phone, setPhone] = useState<Phone | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null); // TODO 1
    setPhone(null);
    try { // TODO 2
      // chạy song song: gọi API + chờ 2s → loading hiện ít nhất 2 giây
      const [p] = await Promise.all([fetchPhone("1"), sleep(2000)]);
      setPhone(p);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Lỗi không xác định");
    }
  }, []);

  useEffect(() => { // TODO 3
    load();
  }, [load]);

  if (error) return <ErrorBox message={error} onRetry={load} />; // TODO 4
  if (!phone) return <Loading />; // TODO 5
  return <SelectPhoneApp phone={phone} />; // TODO 6
}