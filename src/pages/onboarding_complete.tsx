import Image from "next/image";
import { useRouter } from "next/router";
import BitcoinImg from "public/bitcoin.png";
import AppNavbar from "src/components/AppNavbar";
import Button from "src/components/Button";
import Footer from "src/components/Footer";

const debug = require("debug")("app:OnboardingComplete");

interface OnboardingCompleteProps {}

export default function OnboardingComplete(props: OnboardingCompleteProps) {
  const router = useRouter();

  return (
    <div>
      <AppNavbar />
      <div className="container mx-auto flex flex-col justify-center items-center">
        <div className="w-48 h-48 relative">
          <Image src={BitcoinImg} alt="Bitcoin" fill />
        </div>
        <div className="text-4xl font-medium my-2">Congratulations!</div>
        <div className="text-3xl font-medium my-2">
          You just earned 0.000000034 Bitcoin!
        </div>
        <Button
          className="my-8"
          onClick={() => router.push("/dashboard")}
          size="xl"
        >
          GO TO DASHBOARD
        </Button>
      </div>

      <Footer />
    </div>
  );
}
