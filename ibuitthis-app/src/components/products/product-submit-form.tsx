"use client";
import { Loader2, SparklesIcon } from "lucide-react";
import FormField from "../forms/form-field";
import { Button } from "../ui/button";
import { FormEvent, useActionState } from "react";
import { addProductAction } from "@/lib/products/product-action";

type FormState = {
    success: boolean;
    error: Record<string, string[]>;
    message: string;
  };

const initialState: FormState = {
  success: false,
  error: {},
  message: "",
};



export default function ProductSubmitForm() {
  const [state, formAction, isPending] = useActionState(
    addProductAction,
    initialState,
  );

  const { error, message, success } = state;

  return (
    <form action={formAction} className="space-y-6">
      <FormField
        label="Product Name"
        id="name"
        name="name"
        placeholder="My Awesome Product"
        required
        error={error.name?.[0] || ""}
        onChange={() => {}}
      />
      <FormField
        label="Slug"
        id="slug"
        name="slug"
        placeholder="my-awesome-product"
        required
        error={error.slug?.[0] || ""}
        onChange={() => {}}
        helperText="The slug is the URL-friendly version of the product name. It should be lowercase and contain only letters, numbers, and hyphens."
      />
      <FormField
        label="Tagline"
        id="tagline"
        name="tagline"
        placeholder="A short, catchy tagline for your product"
        required
        error={error.tagline?.[0] || ""}
        onChange={() => {}}
      />
      <FormField
        label="Description"
        id="description"
        name="description"
        placeholder="A detailed description of your product"
        required
        error={error.description?.[0] || ""}
        onChange={() => {}}
        textarea
        helperText="Tell us about your product..."
      />
      <FormField
        label="Website URL"
        id="websiteUrl"
        name="websiteUrl"
        placeholder="https://example.com"
        required
        error={error.websiteUrl?.[0] || ""}
        onChange={() => {}}
        helperText="The website URL is the URL of the product's website. It should be a valid URL."
      />
      <FormField
        label="Tags"
        id="tags"
        name="tags"
        placeholder="AI, Productivity, SaaS"
        required
        error={error.tags?.[0] || ""}
        onChange={() => {}}
        helperText="The tags are the keywords for the product. They should be separated by commas."
      />
      <Button type="submit" size="lg" className="w-full">
        {isPending ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <SparklesIcon className="size-4" />
            Submit Product
          </>
        )}
      </Button>
    </form>
  );
}
