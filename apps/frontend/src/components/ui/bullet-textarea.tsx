"use client";

import { Textarea } from "@/components/ui/textarea";
import { useState, useRef } from "react";
import { Button } from "./button";

interface BulletTextAreaProps {
  placeholder?: string;
}
export function BulletTextArea({ placeholder }: BulletTextAreaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState("");
  const addBullet = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const cursor = textarea.selectionStart;

    const lineStart = value.lastIndexOf("\n", cursor - 1) + 1;

    if (value.slice(lineStart, lineStart + 2) === "• ") {
      return;
    }

    const newValue = value.slice(0, lineStart) + "• " + value.slice(lineStart);

    setValue(newValue);

    requestAnimationFrame(() => {
      textarea.focus();

      textarea.selectionStart = textarea.selectionEnd = cursor + 2;
    });
  };
  return (
    <div>
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
      />
      <Button
        variant={"ghost"}
        className="ring ring-blue-200 size-3"
        onClick={addBullet}
      >
        •
      </Button>
    </div>
  );
}
