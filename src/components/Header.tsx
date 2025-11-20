"use client";
import React from "react";
import HeaderMenu from "./HeaderMenu";
import Image from "next/image";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { SUPPORTED_LOCALES, LOCALE_COOKIE } from "../i18n/routing";

export interface HeadersProps {
  children: React.ReactNode;
  currentLocale: string;
}

export default function Header({ children, currentLocale }: HeadersProps) {
  const router = useRouter();
  const flags: Record<string, string> = { en: "GB", ru: "RU", uk: "UA" };

  return (
    <header className="flex items-center py-6 px-10 border-b border-gray-300">
      <h1 className="flex-1 text-3xl font-semibold text-gray-900">
        {children}
      </h1>

      <div className="flex items-center gap-3 ">
        <HeaderMenu
          trigger={<span className="material-icons">mail</span>}
          content={
            <div className="p-2">
              <div className="font-bold mb-1">Непрочитанных: 3</div>
              <div className="py-1 border-b">Система: обновление доступно</div>
              <div className="py-1 border-b">Система: новый бонус</div>
              <div className="py-1">Система: напоминание</div>
            </div>
          }
        />

        <HeaderMenu
          trigger={<span className="material-icons">notifications</span>}
          content={
            <div className="p-2">
              <div className="py-1 border-b">Событие A</div>
              <div className="py-1 border-b">Событие B</div>
              <div className="py-1">Событие C</div>
            </div>
          }
        />

        <HeaderMenu
          trigger={<span className="material-icons">language</span>}
          content={
            <div className="p-2 flex flex-col">
              {SUPPORTED_LOCALES.map((l) => (
                <span
                  key={l}
                  className="py-1 px-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => {
                    Cookies.set(LOCALE_COOKIE, l, { expires: 365, path: "/" });
                    router.refresh();
                  }}
                >
                  {flags[l]} — {l.toUpperCase()}
                </span>
              ))}
            </div>
          }
        />

        <HeaderMenu
          trigger={
            <Image
              src="/images/avatar.png"
              alt="avatar"
              width={40}
              height={40}
              className="rounded-full cursor-pointer"
            />
          }
          content={
            <ul className="p-2">
              <li className="py-1 hover:bg-gray-200 cursor-pointer">Профиль</li>
              <li className="py-1 hover:bg-gray-200 cursor-pointer">
                Настройки
              </li>
              <li className="py-1 hover:bg-gray-200 cursor-pointer">Выйти</li>
              <li className="py-1 hover:bg-gray-200 cursor-pointer">Помощь</li>
            </ul>
          }
        />
      </div>
    </header>
  );
}
