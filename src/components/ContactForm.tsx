"use client";

import React, { useActionState, useState } from "react";
import { submitContactForm } from "@/lib/actions/contact";
import { ContactSchema } from "@/validations/contact";
import { z } from "zod";

export default function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, {
    success: false,
    errors: {},
  });

  // client validation
  const [clientErrors, setClientErrors] = useState({ name: "", email: "" });

  const handleOnBlue = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    try {
      if (name === "name") {
        ContactSchema.pick({ name: true }).parse({ name: value });
      } else if (name === "email") {
        ContactSchema.pick({ email: true }).parse({ email: value });
      }

      setClientErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors[0]?.message || "";
        setClientErrors((prev) => ({
          ...prev,
          [name]: errorMessage,
        }));
      }
    }
  };

  return (
    // error
    <div className="container mx-auto">
      {/* form */}
      <form action={formAction}>
        <div className="py-24 text-gray-500">
          <div className="max-auto flex flex-col bg-white shadow-md p-8 md:w-1/2">
            <h2 className="text-lg mb-2">お問い合わせ</h2>
            <div className="mb-4">
              <label htmlFor="" className="text-sm">
                名前
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none py-1 px-3 leading-8"
                onBlur={handleOnBlue}
              />
              {clientErrors.name && (
                <p className="text-red-500 text-sm mt-1">{clientErrors.name}</p>
              )}
              {state.errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {state.errors.name.join(",")}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="" className="text-sm">
                メールアドレス
              </label>
              <input
                type="text"
                id="email"
                name="email"
                className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none py-1 px-3 leading-8"
                onBlur={handleOnBlue}
              />
              {clientErrors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {clientErrors.email}
                </p>
              )}
              {state.errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {state.errors.email.join(",")}
                </p>
              )}
            </div>
            <button className="text-white bg-indigo-500 hover:bg-indigo-600 rounded text-lg py-4">
              送信
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
