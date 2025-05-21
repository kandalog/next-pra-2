"use server";
import { ContactSchema } from "@/validations/contact";
import { redirect } from "next/navigation";

type ActionState = {
  success: boolean;
  errors: {
    name?: string[];
    email?: string[];
  };
  saverError?: string;
};

export async function submitContactForm(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  console.log("start server action");

  const name = formData.get("name");
  const email = formData.get("email");

  // バリデーション
  const validationResult = ContactSchema.safeParse({ name, email });
  if (!validationResult.success) {
    // エラーメッセージの取得 flattenでエラーを見やすく加工する
    const errors = validationResult.error.flatten().fieldErrors;
    console.log("バリデーションエラー", errors);
    return {
      success: false,
      errors: {
        name: errors.name || [],
        email: errors.email || [],
      },
    };
  }

  console.log("pass the if statement");

  // DB登録

  console.log("送信されたデータ", { name, email });

  redirect("/contacts/complete");
}
