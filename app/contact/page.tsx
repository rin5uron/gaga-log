"use client";

import { useState } from "react";
import DateInfo from "@/components/DateInfo";

// Note: メタデータは"use client"があると直接exportできないため、
// layout.tsxで設定するか、静的ページにする必要があります
// 現在はクライアントコンポーネントなので、layout.tsxのデフォルトメタデータが使用されます

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/maqyjzae", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">お問い合わせ</h1>

        <div className="space-y-8">
          <section>
            <p className="text-gray-700 leading-relaxed">
              当サイトに関するご質問、ご意見、著作権に関するお問い合わせなどは、以下のフォームからお願いいたします。
            </p>
          </section>

          <section className="bg-gray-50 p-6 rounded-lg">
            {status === "success" ? (
              <div className="text-center py-8">
                <p className="text-lg text-green-600 font-semibold mb-2">
                  送信が完了しました
                </p>
                <p className="text-gray-600">
                  お問い合わせいただきありがとうございます。<br />
                  内容を確認の上、数日以内にご返信いたします。
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-4 text-blue-600 hover:underline"
                >
                  別のお問い合わせを送信する
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    お名前 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    メールアドレス <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                    件名 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    お問い合わせ内容 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={8}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {status === "error" && (
                  <p className="text-red-600 text-sm">
                    送信に失敗しました。時間をおいて再度お試しください。
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                  {status === "submitting" ? "送信中..." : "送信する"}
                </button>
              </form>
            )}
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">お問い合わせについて</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>お問い合わせへの返信には数日かかる場合がございます。</li>
              <li>内容によっては回答できない場合もございますので、予めご了承ください。</li>
              <li>著作権・肖像権に関するお問い合わせには迅速に対応いたします。</li>
            </ul>
          </section>

          <section className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-700">
              運営者情報については
              <a href="/about" className="text-blue-600 hover:underline ml-1">
                こちら
              </a>
              をご覧ください。
            </p>
          </section>

          <div className="mt-8 pt-4 border-t border-gray-200">
            <DateInfo
              date="2025-12-27"
              updatedDate="2025-12-27"
              className="text-gray-600 text-sm"
              showCreatedLabel={true}
              showUpdatedLabel={true}
              createdLabel="作成日"
              updatedLabel="最終更新日"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
