import { z } from "zod";

export const ContactSchema = z.object({
  name: z
    .string()
    .min(3, "名前は3文字以上で入植してください")
    .max(20, "名前は20文字以内で入力してください"),
  email: z
    .string()
    .min(1, "メールアドレスは必須です")
    .email("正しいメールアドレスの形式で入力してください"),
});

// 型の定義 (フォームやAPIで使用)
export type ContactType = z.infer<typeof ContactSchema>;
