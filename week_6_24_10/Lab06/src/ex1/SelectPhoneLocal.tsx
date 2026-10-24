import React from "react";
import { PHONES } from "../data/phones";
import { SelectPhoneApp } from "./SelectPhoneApp";

// Bài 1: dữ liệu viết cứng
export function SelectPhoneLocal() {
  return <SelectPhoneApp phone={PHONES[0]} />;
}
