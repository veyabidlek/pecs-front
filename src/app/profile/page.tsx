"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { CaregiverRecipients } from "../components/careGiverRecipents";
import { GenerateCodeModal } from "../components/generateCodeModal";
import { VerifyCodeModal } from "../components/verifyCodeModal";
import Navbar from "../components/navBar";
import axios from "axios";
import { userDataAtom } from "../atoms";
import { useAtom } from "jotai";
import { isAuthenticatedAtom, userTypeAtom } from "../atoms";
import { UserData } from "../types";
const url = process.env.BACKEND_URL;

export default function CaregiverProfile() {
  const [showGenerateCode, setShowGenerateCode] = useState(false);
  const [showVerifyCode, setShowVerifyCode] = useState(false);
  const [user, setUser] = useAtom(userDataAtom);
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const [userType] = useAtom(userTypeAtom);

  const getUserData = async (): Promise<UserData | null> => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const endpoint = userType === "caregiver" ? "cg-profile" : "cr-profile";
      const response = await axios.get<UserData>(`${url}/${endpoint}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      return response.data;
    } catch (err) {
      console.error("Error fetching user data:", err);
      return null;
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserData();
      if (data) {
        setUser(data);
      }
    };
    if (isAuthenticated) {
      fetchUserData();
    }
  }, [isAuthenticated, setUser]);

  const generateCode = async (): Promise<string> => {
    try {
      const response = await fetch("/api/generate-code", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await response.text();
    } catch (error) {
      console.error("Error generating code:", error);
      return "Error generating code";
    }
  };

  return (
    <div>
      <div className="pt-8 min-h-screen mx-auto max-w-7xl px-4 sm:px-8 lg:px-16">
        <Navbar isHomePage={false} />
        {isAuthenticated ? (
          <div>
            <h4 className="text-2xl font-semibold">Профиль</h4>

            <div className="flex pt-5">
              <div>
                <Image
                  src={user.profile_pic || "/images/no_profile_pic.png"}
                  alt="Profile"
                  width={250}
                  height={250}
                  className="object-cover"
                />
              </div>

              <div className="ml-12 text-xl">
                <div className="my-2.5">
                  <label className="inline-block w-64">Имя: </label>
                  <span>{user.first_name}</span>
                </div>
                <div className="my-2.5">
                  <label className="inline-block w-64">Фамилия: </label>
                  <span>{user.last_name}</span>
                </div>
                <div className="my-2.5">
                  <label className="inline-block w-64">Имя пользователя:</label>
                  <span>{user.username}</span>
                </div>
                <div className="my-2.5">
                  <label className="inline-block w-64">Почта: </label>
                  <span>{user.email}</span>
                </div>
              </div>
            </div>
            {user.is_cg && (
              <h3 className="text-2xl font-semibold">Мои подопечные</h3>
            )}

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
              {user.is_cg && (
                <CaregiverRecipients recipients={user.recipients} />
              )}
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
        ) : (
          <div>Пожалуйста, войдите в систему</div>
        )}
      </div>
    </div>
  );
}
