import React from "react";
import LeftCardWrapper from "./LeftCardWrapper";
import { FiExternalLink } from "react-icons/fi";
import { Resource } from "@/src/domain/resource";

interface ResourcesCardProps {
  resources: Resource[];
}

export default function ResourcesCard({ resources }: ResourcesCardProps) {
  return (
    <LeftCardWrapper title="Ресурсы">
      <ul className="space-y-1">
        {resources.map((item) => (
          <li key={item.id} className="flex items-center gap-3 mb-1">
            <FiExternalLink className="text-gray-500" />
            {item.url ? (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {item.title}
              </a>
            ) : (
              <span>{item.title}</span>
            )}
          </li>
        ))}
      </ul>
    </LeftCardWrapper>
  );
}
