import { SlashIcon } from "lucide-react";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../../ui/breadcrum";

interface BreadcrumbBlogProps {
  breadCrums: {
    href: string;
    label: string;
  }[];
}

const BreadcrumbBlog = ({ breadCrums }: BreadcrumbBlogProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadCrums.map(({ href, label }, index) => (
          <React.Fragment key={href}>
            <BreadcrumbItem>
              <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
            </BreadcrumbItem>

            {index < breadCrums.length - 1 && (
              <BreadcrumbSeparator>
                <SlashIcon />
              </BreadcrumbSeparator>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbBlog;
