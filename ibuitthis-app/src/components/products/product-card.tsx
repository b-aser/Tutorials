"use client";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import { ChevronDownIcon, ChevronUpIcon, SparklesIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { products } from "@/db/schema";
import { InferSelectModel } from "drizzle-orm";

type Product = InferSelectModel<typeof products>;

export default function ProductCard({ product }: { product: Product }) {
  const [votes, setVotes] = useState(product.voteCount);
  const [hasVoted, setHasVoted] = useState(false);
  const handleVote = (direction: "up" | "down") => {
    if (direction === "up") {
      setVotes(votes + 1);
      setHasVoted(true);
    } else {
      setVotes(votes - 1);
      setHasVoted(true);
    }
  };
  const handleUpVote = () => {
    if (hasVoted) return;
    handleVote("up");
    setHasVoted(true);
  };
  const handleDownVote = () => {
    if (hasVoted) return;
    handleVote("down");
    setHasVoted(true);
  };
  return (
    <Link href={`/products/${product.id}`}>
      <Card className="group card-hover hover:bg-primary-foreground/10 border-solid border-primary/10 min-h-[200px]">
        <CardHeader className="flex-1">
          <div className="flex items-start gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {product.name}
                </CardTitle>
                {product.voteCount > 100 && (
                  <Badge
                    variant="outline"
                    className="gap-1 bg-primary text-primary-foreground"
                  >
                    <SparklesIcon className="size-4 fill-current" />
                    Featured
                  </Badge>
                )}
              </div>
              <CardDescription>{product.description}</CardDescription>
            </div>
            {/* Voting Section */}
            <div className="flex flex-col items-center gap-1 shrink-0">
              <Button
                variant="ghost"
                size="icon-sm"
                className={cn(
                  "h-8 w-8 text-primary",
                  hasVoted
                    ? "hover:text-destructive"
                    : "opacity-50 cursor-not-allowed",
                )}
                onClick={handleUpVote}
                disabled={hasVoted}
              >
                <ChevronUpIcon className="size-4" />
              </Button>
              <span className="text-sm font-semibold transition-colors text-foreground">
                {product.voteCount}
              </span>
              <Button
                variant="ghost"
                size="icon-sm"
                className={cn(
                  "h-8 w-8 text-primary",
                  hasVoted
                    ? "hover:text-destructive"
                    : "opacity-50 cursor-not-allowed",
                )}
                onClick={handleDownVote}
                disabled={hasVoted}
              >
                <ChevronDownIcon className="size-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardFooter className="bg-primary-foreground/10 border-t-0">
          <div className="gap-2 flex flex-wrap">
            {product.tags?.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
