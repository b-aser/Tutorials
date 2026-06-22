import { CompassIcon, HomeIcon, LoaderIcon, SparklesIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Suspense } from "react";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <div className="size-8 rounded-lg bg-primary flex items-center justify-center">
        <SparklesIcon className="size-4 text-primary-foreground" />
      </div>
      <span className="font-bold">
        is<span className="text-primary">Built</span>This
      </span>
    </Link>
  );
};

export default function Header() {
  const isSignedIn = false;
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="wrapper px-12">
        <div className="flex h-16 items-center justify-between">
          <Logo />
          <nav className="flex items-center gap-1">
            <Link
              href="/"
              className="flex items-center gap-2 px-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hover:bg-muted rounded-md"
            >
              <HomeIcon className="size-4" />
              <span>Home</span>
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 px-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors hover:bg-muted rounded-md"
            >
              <CompassIcon className="size-4" />
              <span>Explore</span>
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Suspense
              fallback={
                <div>
                  <LoaderIcon className="size-4 animate-spin" />
                </div>
              }
            >
              <Show when="signed-out">
                <SignInButton />
                <SignUpButton>
                  <button className="bg-primary text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-8 px-4 sm:px-5 cursor-pointer">
                    Sign Up
                  </button>
                </SignUpButton>
              </Show>
              <Show when="signed-in">
                <Button asChild>
                  <Link href="/submit">
                    <SparklesIcon className="size-4" />
                    Submit Project
                  </Link>
                </Button>
                <UserButton />
              </Show>
            </Suspense>
          </div>
        </div>
      </div>
    </header>
  );
}
