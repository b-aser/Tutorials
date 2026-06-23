"use server";

import { db } from "@/db";
import { products } from "@/db/schema";

type FormState = {
  success: boolean;
  error: Record<string, string[]>;
  message: string;
};

export const addProductAction = async (
  prevState: FormState,
  formData: FormData,
) => {
  try {
    const name = formData.get("name") as string;
  } catch (error) {
    return {
      success: false,
      error: { name: ["Failed to submit product"] },
      message: "Failed to submit product",
    };
  }
};
