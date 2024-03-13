import Image from "next/image";
import { Inter } from "next/font/google";
import Button from "../../components/Button";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  return (
    <>
      <div className="h-screen flex items-center">
        <div className="max-w-[716px] m-auto text-center">
          <Image
            src={"/black-bull-logo.svg"}
            alt="logo"
            width={180}
            height={90}
            className="m-auto mb-8"
          />
          <h1 className="text-2xl font-bold mb-2">Get Started</h1>
          <p className="text-blueGrey-700 mb-8">
            Choose <b className="text-[#151515]"> &apos;New User&apos; </b>if
            you&apos;re joining us for the first time, or{" "}
            <b className="text-[#151515]"> &apos;Existing User&apos; </b>if
            you&apos;ve been here before. Let&apos;s make your experience
            seamless!
          </p>
          <div className="flex justify-center gap-4">
            <Button
              text="Log in"
              className="px-12 pt-[8px] pb-[10px] text-sm font-semibold !rounded-full"
              onClick={() => router.push("/login")}
            />
            <Button
              text="Sign up"
              className="px-12 pt-[8px] pb-[10px] text-sm font-semibold !rounded-full !bg-transparent text-primary border !border-[#2B36D9]"
              onClick={() => router.push("/signup")}
            />
          </div>
        </div>
      </div>
    </>
  );
}
