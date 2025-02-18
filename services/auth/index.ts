"use server";

import { signIn } from "next-auth/react";

export const createUser = async (data: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (res?.ok) {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      if (!result?.ok) {
        return Error()
      }
    }
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
export const updateUser = async (data: any, id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/user/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (res?.ok) {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      if (!result?.ok) {
        return Error()
      }
    }
    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
