import React from "react";
import { FiHome, FiBriefcase, FiMapPin } from "react-icons/fi";
import LeftCardWrapper from "./LeftCardWrapper";

export interface AboutCardProps {
  birthPlace: string;
  job: string;
  currentLocation: string;
}

export default function AboutCard({
  birthPlace,
  job,
  currentLocation,
}: AboutCardProps) {
  return (
    <LeftCardWrapper title="Инфо">
      <div className="flex items-center gap-3 mb-1">
        <FiHome className="text-gray-600" />
        <span className="text-blue-900">{birthPlace}</span>
      </div>
      <div className="flex items-center gap-3 mb-1">
        <FiBriefcase className="text-gray-600" />
        <span className="text-blue-900">{job}</span>
      </div>
      <div className="flex items-center gap-3 mb-1">
        <FiMapPin className="text-gray-600" />
        <span className="text-blue-900">{currentLocation}</span>
      </div>
    </LeftCardWrapper>
  );
}
