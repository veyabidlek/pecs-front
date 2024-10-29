"use client";
import { useState } from "react";
import Image from "next/image";
import { Caregiver, Recipient } from "../types/index";
import { CaregiverRecipients } from "../components/careGiverRecipents";
import { GenerateCodeModal } from "../components/generateCodeModal";
import { VerifyCodeModal } from "../components/verifyCodeModal";
import Navbar from "../components/navBar";

export default function CaregiverProfile() {
  const [showGenerateCode, setShowGenerateCode] = useState(false);
  const [showVerifyCode, setShowVerifyCode] = useState(false);

  // Dummy data for caregiver and recipients with required 'user' properties
  const caregiver: Caregiver = {
    user: {
      first_name: "John",
      last_name: "Doe",
      username: "johndoe",
      email: "johndoe@example.com",
    },
  };

  const recipients: Recipient[] = [
    {
      user: {
        first_name: "Jane",
        last_name: "Smith",
        username: "janesmith",
        email: "janesmith@example.com",
      },
    },
    {
      user: {
        first_name: "Emily",
        last_name: "Jones",
        username: "emilyjones",
        email: "emilyjones@example.com",
      },
    },
  ];

  const generateCode = async (): Promise<string> => {
    try {
      const response = await fetch("/api/generate-code", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.text();
      return data;
    } catch (error) {
      console.error("Error generating code:", error);
      return "Error generating code"; // Return a default error message as a string
    }
  };

  return (
    <div>
      <div className="pt-8 min-h-screen mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
        <Navbar />
        <h4 className="text-2xl font-semibold">Профиль</h4>

        <div className="flex pt-5">
          <div>
            <Image
              src="/images/no_profile_pic.png"
              alt="Profile"
              width={250}
              height={250}
              className="object-cover"
            />
          </div>

          <div className="ml-12 text-xl">
            <div className="my-2.5">
              <label className="inline-block w-64">Имя: </label>
              <span>{caregiver.user.first_name}</span>
            </div>
            <div className="my-2.5">
              <label className="inline-block w-64">Фамилия: </label>
              <span>{caregiver.user.last_name}</span>
            </div>
            <div className="my-2.5">
              <label className="inline-block w-64">Имя пользователя: </label>
              <span>{caregiver.user.username}</span>
            </div>
            <div className="my-2.5">
              <label className="inline-block w-64">Почта: </label>
              <span>{caregiver.user.email}</span>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-2xl font-semibold">Мои подопечные</h3>
        </div>

        <div className="mt-8">
          <button
            onClick={() => setShowGenerateCode(true)}
            className="bg-primary text-white border border-[#D9D9D9] rounded-t-md px-2 py-1 mr-2"
          >
            Сгенерировать код
          </button>
          <button
            onClick={() => setShowVerifyCode(true)}
            className="border-2 border-[#D9D9D9] rounded-t-md px-2 py-1"
          >
            Ввести код
          </button>

          <CaregiverRecipients recipients={recipients} />
        </div>

        {showGenerateCode && (
          <GenerateCodeModal
            onClose={() => setShowGenerateCode(false)}
            onGenerate={generateCode}
          />
        )}

        {showVerifyCode && (
          <VerifyCodeModal onClose={() => setShowVerifyCode(false)} />
        )}
      </div>
    </div>
  );
}
