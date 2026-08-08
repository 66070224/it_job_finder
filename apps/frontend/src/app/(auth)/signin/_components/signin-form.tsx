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
    console.log(data);
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <Button className="py-5 cursor-pointer" type="submit">
          เข้าสู่ระบบ
        </Button>
      </FieldGroup>
    </form>
  );
}
