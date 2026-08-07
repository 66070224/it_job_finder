"use client";
import { useRouter } from "next/navigation";
import { Tag } from "./tag";
import { ArrowLeft } from "lucide-react";

export function BackButton() {
  const router = useRouter();
  return (
    <button className="cursor-pointer" onClick={() => router.back()}>
      <Tag
        className="flex items-center gap-1"
        text={
          <>
            <ArrowLeft size={9} />
            กลับไปหน้าก่อน
          </>
        }
      />
    </button>
  );
}
