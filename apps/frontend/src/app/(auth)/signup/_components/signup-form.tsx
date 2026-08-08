"use client";
import { signUpSchema } from "@/app/schemas/auth";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

type SignUpFormData = z.infer<typeof signUpSchema>;

export default function SignUpForm() {
  const { handleSubmit, control } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
    },
  });

  const onSubmit = async (data: SignUpFormData) => {
    const response = await fetch("http://localhost:4000/auths/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        first_name: data.first_name,
        last_name: data.last_name,
      }),
    });
    if (!response.ok) {
      setState("sdadadadssad");
      return;
    }
    return router.push("/signin");
  };
  const [state, setState] = useState("");
  const router = useRouter();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {state && <>eiie{state}</>}
      <FieldGroup className="gap-6">
        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="first_name"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>ชื่อ</FieldLabel>
                <Input
                  className="py-5"
                  aria-invalid={fieldState.invalid}
                  placeholder="ชื่อจริง"
                  type="text"
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="last_name"
            control={control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>นามสกุล</FieldLabel>
                <Input
                  className="py-5"
                  aria-invalid={fieldState.invalid}
                  placeholder="นามสกุล"
                  type="text"
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

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
              <FieldLabel>รหัสผ่าน</FieldLabel>
              <Input
                className="py-5"
                aria-invalid={fieldState.invalid}
                placeholder="อย่างน้อย 8 ตัวอักษร"
                type="password"
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button type="submit" className="py-5">
          สร้างบัญชี
        </Button>
      </FieldGroup>
    </form>
  );
}
