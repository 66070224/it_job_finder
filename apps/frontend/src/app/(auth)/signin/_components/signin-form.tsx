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
import { Controller, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";

export default function SignInForm() {
  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit() {}
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="gap-6">
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>อีเมล</FieldLabel>
              <Input
                className="py-5"
                aria-invalid={fieldState.invalid}
                placeholder="jobit@example.com"
                type="email"
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
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
        <Button className="py-5 cursor-pointer" type="submit">
          เข้าสู่ระบบ
        </Button>
        <div className="flex items-center gap-4 mx-2">
          <div className="h-px flex-1 bg-border" />
          <span className="text-sm text-muted-foreground">หรือ</span>
          <div className="h-px flex-1 bg-border" />
        </div>
        <Button className="py-5 cursor-pointer border-border" variant="secondary">
          <FcGoogle className="mr-2 h-5 w-5"/>
          เข้าสู่ระบบด้วย Google
        </Button>
      </FieldGroup>
    </form>
  );
}
