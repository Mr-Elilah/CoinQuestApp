import React from "react";
import Image from "next/image";
import LeftCardWrapper from "./LeftCardWrapper";

export interface ParticipantCardProps {
  name: string;
  age: number;
  profession: string;
  avatar: string;
}

export default function ParticipantCard({
  name,
  age,
  profession,
  avatar,
}: ParticipantCardProps) {
  return (
    <LeftCardWrapper title="Участник">
      <div className="flex flex-col items-center text-center">
        <div className="w-38 h-38 relative mb-4">
          <Image
            src={avatar}
            alt={name}
            fill
            className="rounded-full object-cover"
          />
        </div>

        <h3 className="font-semibold">{name} </h3>
        <p className="text-sm text-gray-600 mt-1"> Возраст: {age}</p>
        <p className="text-sm text-gray-600 mt-1"> Профессия: {profession}</p>
      </div>
    </LeftCardWrapper>
  );
}
