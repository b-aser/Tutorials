"use server";

import { db } from "@/db";
import { products } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { ZCOOL_KuaiLe } from "next/font/google";
import { productSchema } from "./product-validation";

type FormState = {
  success: boolean;
  error: Record<string, string[]>;
  message: string;
};

export const addProductAction = async (
  prevState: FormState | undefined,
  formData: FormData,
): Promise<FormState> => {
  try {
    // auth
    const { userId, orgId } = await auth();

    if (!userId) {
      return {
        success: false,
        error: { name: ["Unauthorized"] },
        message: "You must be logged in to submit a product",
      };
    }

    // data
    const user = await currentUser();
    const userEmail = user?.emailAddresses[0]?.emailAddress || "anonymous";

    const rawFormData = Object.fromEntries(formData.entries());

    // validate data
    const validatedFields = productSchema.safeParse(rawFormData);

    if (!validatedFields.success) {
      return {
        success: false,
        error: validatedFields.error.flatten().fieldErrors,
        message: "Invalid fields",
      };
    }

    const { name, slug, tagline, description, websiteUrl, tags } =
      validatedFields.data;

    const tagsArray = tags
      ? tags.filter((tags) => typeof tags === "string")
      : [];

    await db.insert(products).values({
      name,
      slug,
      tagline,
      description,
      websiteUrl,
      tags: tagsArray,
      status: "pending",
      submittedBy: userEmail,
      userId: userId,
      organizationId: orgId,
    });

    return {
      success: true,
      error: {},
      message:
        "Product submitted successfully! It will be reviewed by the team shortly.",
    };
  } catch (error) {

    if (error instanceof Error) {
      return {
        success: false,
        error: { name: [error.message] },
        message: error.message,
      };
    }

    return {
      success: false,
      error: { name: ["Failed to submit product"] },
      message: "Failed to submit product. Please try again.",
    };
  }
};
