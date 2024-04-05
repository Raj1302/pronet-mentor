import Link from "next/link";
import { Button } from "./ui/button";
import { ModeToggle } from "./ModeToggle";

export default function Navbar() {
  return (
    <div className="flex fixed w-full items-center p-6 justify-between backdrop-blur border-b border-zinc-300 dark:border-zinc-800">
      <Link href={"/"}>
      <Button variant={"outline"} className="text-xl p-6">Pronet Mentor</Button>
      </Link>
      <div className="flex items-center justify-center gap-6">
        <Link href={"/conversation"}>
          <Button variant={"outline"}>Chat Now</Button>
        </Link>
        <ModeToggle />
      </div>
    </div>
  );
}
