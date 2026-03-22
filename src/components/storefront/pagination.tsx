import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  baseHref: string; // e.g. "/electronics.html?sort=popular"
}

export function Pagination({ currentPage, totalPages, totalItems, pageSize, baseHref }: PaginationProps) {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Generate page numbers with ellipsis
  const pages = getPageNumbers(currentPage, totalPages);

  function pageHref(page: number) {
    const separator = baseHref.includes("?") ? "&" : "?";
    return `${baseHref}${separator}page=${page}`;
  }

  return (
    <div className="flex flex-col items-center gap-3 mt-8">
      <p className="text-sm text-muted-foreground">
        Items {startItem.toLocaleString()}-{endItem.toLocaleString()} of {totalItems.toLocaleString()}
      </p>
      <div className="flex items-center gap-1">
        {currentPage > 1 && (
          <Link href={pageHref(currentPage - 1)}>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </Link>
        )}

        {pages.map((page, i) =>
          page === "..." ? (
            <span key={`ellipsis-${i}`} className="px-2 text-muted-foreground text-sm">...</span>
          ) : (
            <Link key={page} href={pageHref(page as number)}>
              <Button
                variant={page === currentPage ? "default" : "outline"}
                size="sm"
                className="h-8 w-8 p-0"
              >
                {page}
              </Button>
            </Link>
          )
        )}

        {currentPage < totalPages && (
          <Link href={pageHref(currentPage + 1)}>
            <Button variant="outline" size="icon" className="h-8 w-8">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "...")[] = [1];

  if (current > 3) pages.push("...");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (current < total - 2) pages.push("...");

  pages.push(total);
  return pages;
}
