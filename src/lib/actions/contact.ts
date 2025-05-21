"use server";
import { ContactSchema } from "@/validations/contact";
import { redirect } from "next/navigation";

export async function submitContactForm(formData: FormData) {
  console.log("start server action");

  const name = formData.get("name");
  const email = formData.get("email");

  // バリデーション
  const validationResult = ContactSchema.safeParse({ name, email });
  if (!validationResult.success) {
    // エラーメッセージの取得 flattenでエラーを見やすく加工する
    const errors = validationResult.error.flatten();
    console.log("バリデーションエラー", errors);
    return { success: false, errors: errors.fieldErrors };
  }

  console.log("pass the if statement");

  // DB登録

  console.log("送信されたデータ", { name, email });

  redirect("/contacts/complete");
}
