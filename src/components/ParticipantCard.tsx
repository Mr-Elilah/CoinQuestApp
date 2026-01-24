import React from "react";
import Image from "next/image";
import LeftCardWrapper from "./LeftCardWrapper";
import { User } from "@/src/domain/user";
export interface ParticipantCardProps {
  user: User;
}

export default function ParticipantCard({ user }: ParticipantCardProps) {
  return (
    <LeftCardWrapper title="Участник">
      <div className="flex flex-col items-center text-center">
        <div className="w-38 h-38 relative mb-4">
          <Image
            src={user.avatarUrl}
            alt={user.name}
            fill
            className="rounded-full object-cover"
          />
        </div>

        <h3 className="font-semibold">{user.name} </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 ">
          {" "}
          Возраст: {user.age}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
          Профессия: {user.profession}
        </p>
      </div>
    </LeftCardWrapper>
  );
}
