import React from "react";
import { FiHome, FiBriefcase, FiMapPin } from "react-icons/fi";
import LeftCardWrapper from "./LeftCardWrapper";
import { User } from "@/src/domain/user";

export interface AboutCardProps {
  user: User;
}

export default function AboutCard({ user }: AboutCardProps) {
  return (
    <LeftCardWrapper title="Инфо">
      <div className="flex items-center gap-3 mb-1">
        <FiHome className="text-gray-600" />
        <span className="text-blue-900">{user.birthPlace}</span>
      </div>
      <div className="flex items-center gap-3 mb-1">
        <FiBriefcase className="text-gray-600" />
        <span className="text-blue-900">{user.workplace}</span>
      </div>
      <div className="flex items-center gap-3 mb-1">
        <FiMapPin className="text-gray-600" />
        <span className="text-blue-900">{user.currentLocation}</span>
      </div>
    </LeftCardWrapper>
  );
}
