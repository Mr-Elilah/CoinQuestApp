"use client";
import Image from "next/image";
import DropdownMenuS from "@/src/components/DropdownMenuS";
import { SUPPORTED_LOCALES } from "@/src/i18n/routing";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

type ButtonType = "burger" | "messages" | "notifications" | "locale" | "avatar";

type ButtonProps = {
  type: ButtonType;
  currentLocale?: string;
};

export default function Button({ type, currentLocale }: ButtonProps) {
  const router = useRouter();

  if (type === "locale" && currentLocale) {
    const flags: Record<string, string> = { en: "GB", ru: "RU", uk: "UA" };
    const items = SUPPORTED_LOCALES.map((l) => (
      <span
        key={1}
        onClick={() => {
          Cookies.set("NEXT_LOCALE", l, { expires: 365, path: "/" });
          router.refresh();
        }}
      >
        {flags[l]} {l.toUpperCase()}
      </span>
    ));

    return <DropdownMenuS buttonContent={flags[currentLocale]} items={items} />;
  }

  if (type === "avatar") {
    const items = [
      <span key="profile">Profile</span>,
      <span key="settings">Settings</span>,
      <span key="logout">Logout</span>,
      <span key="help">Help</span>,
    ];
    return (
      <DropdownMenuS
        buttonContent={
          <Image
            src="/images/avatar.png"
            alt="avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
        }
        items={items}
      />
    );
  }

  if (type === "messages") {
    const items = ["Message 1", "Message 2", "Message 2"].map((m) => (
      <span key={m}>{m}</span>
    ));
    return (
      <DropdownMenuS
        buttonContent={<span className="material-icons">message</span>}
        items={items}
      />
    );
  }

  if (type === "notifications") {
    const items = ["notification 1", "notification 2", "notification 2"].map(
      (n) => <span key={n}>{n}</span>
    );
    return (
      <DropdownMenuS
        buttonContent={<span className="material-icons">notification</span>}
        items={items}
      />
    );
  }
  if (type === "burger") {
    return (
      <button onClick={() => alert("Open sidebar (mobile)")} className="p-2">
        <span className="material-icon">menu</span>
      </button>
    );
  }
  return null;
}
