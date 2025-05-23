"use server";
import { ContactSchema } from "@/validations/contact";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

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

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

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
  // メールアドレスが存在しているかの確認
  const existingRecord = await prisma.contact.findUnique({
    where: { email: email },
  });

  if (existingRecord) {
    return {
      success: false,
      errors: {
        name: [],
        email: ["このメールアドレスは既に登録されています"],
      },
    };
  }

  // DBに保存
  await prisma.contact.create({
    data: { name, email },
  });

  console.log("送信されたデータ", { name, email });

  redirect("/contacts/complete");
}
