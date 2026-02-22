import { Terminal } from "lucide-react";
import { ThemeToggle } from "./ui/theme-toggle"; // Need to check if this exists or I'll remove it

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <Terminal className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
              CMD.dev
            </span>
          </a>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <a
              className="transition-colors hover:text-foreground/80 text-foreground"
              href="#about"
            >
              About
            </a>
            <a
              className="transition-colors hover:text-foreground/80 text-foreground"
              href="#projects"
            >
              Projects
            </a>
            <a
              className="transition-colors hover:text-foreground/80 text-foreground"
              href="#chat"
            >
              AI Chat
            </a>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
          </div>
          <nav className="flex items-center">
            {/* Add theme toggle if exists */}
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
