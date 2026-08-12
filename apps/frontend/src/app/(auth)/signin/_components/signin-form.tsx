"use client";
import { signInSchema } from "@/app/schemas/auth";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

type SignInFormData = z.infer<typeof signInSchema>;

export default function SignInForm() {
  const { handleSubmit, control } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    const response = await fetch("http://localhost:4000/auths/signin", {
      method: "POST",
      headers: { "Content_Type" : "application/json" },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });
    if (!response.ok) {
      setState("sdadadadssad");
      return;
    }
    return router.push("/");
  };
  const router = useRouter();
  const [state, setState] = useState("");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {state && <>state: {state}</>}
      <FieldGroup className="gap-6">
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>อีเมล</FieldLabel>
              <Input
                className="py-5"
                aria-invalid={fieldState.invalid}
                placeholder="jobit@example.com"
                type="text"
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <Field>
              <div className="flex justify-between">
                <FieldLabel>รหัสผ่าน</FieldLabel>
                <Link href="/forgot-password">
                  <FieldLabel className="text-primary cursor-pointer">
                    ลืมรหัสผ่าน?
                  </FieldLabel>
                </Link>
              </div>

              <Input
                className="py-5"
                aria-invalid={fieldState.invalid}
                placeholder="••••••••"
                type="password"
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button type="submit" className="py-5 cursor-pointer" >
          เข้าสู่ระบบ
        </Button>
      </FieldGroup>
    </form>
  );
}
