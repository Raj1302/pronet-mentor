import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

import { AspectRatio } from "@/components/ui/aspect-ratio";

export default function HeroSection() {
  return (
    <div className="pt-36">
      <h1 className="text-center leading-loose font-semibold text-4xl px-32">
        Unlock your full <span className="p-1 bg-sky-500 rounded-lg">professional</span> potential with <span className="p-1 bg-red-500 rounded-lg">personalized</span> guidance from
        the ultimate <span className="p-1 bg-yellow-500 rounded-lg">LinkedIn mentor.</span>
      </h1>
      <Link href={"/conversation"} className="flex justify-center pt-12">
        <Button variant={"outline"}>Chat now</Button>
      </Link>
      <div className="flex justify-center w-[70vw] ml-[15vw] pt-12">
        <AspectRatio ratio={16 / 9}>
          <Image
            src="/hero.png"
            fill
            alt="Image"
            className="rounded-xl object-cover border border-zinc-800"
          />
        </AspectRatio>
      </div>
      <h1 className="text-center font-semibold text-xl py-12">
        Elevate your profile, expand your network, and accelerate your career
        journey with expert insights tailored just for you.
      </h1>
    </div>
  );
}
