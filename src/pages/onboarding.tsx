import { useRouter } from "next/router";
import AppNavbar from "src/components/AppNavbar";
import Button from "src/components/Button";
import Footer from "src/components/Footer";

const debug = require("debug")("app:Onboarding");

interface OnboardingProps {}

export default function Onboarding(props: OnboardingProps) {
  const router = useRouter();

  return (
    <div>
      <AppNavbar />
      <div className="container mx-auto flex flex-col justify-center items-center">
        <div className="text-4xl font-medium">
          Watch these videos to start stacking Bitcoin!
        </div>

        <OnboardingSection
          title="What is This? (1 of 3)"
          video="https://youtu.be/1Q8fG0TtVAY"
        />
        <OnboardingSection
          title="What you Get! (2 of 3)"
          video="https://youtu.be/1Q8fG0TtVAY"
        />
        <OnboardingSection
          title="How it Works (3 of 3)"
          video="https://youtu.be/1Q8fG0TtVAY"
        />

        <Button
          onClick={() => router.push("/onboarding_complete")}
          size="xl"
          className="my-6"
        >
          CONTINUE
        </Button>
      </div>

      <Footer />
    </div>
  );
}

interface OnboardingSectionProps {
  title: string;
  video: string;
}

function OnboardingSection(props: OnboardingSectionProps) {
  return (
    <div className="my-8 flex flex-col justify-center items-center">
      <div className="my-4 text-3xl font-medium">{props.title}</div>{" "}
      {/* <ReactPlayer url={props.video} /> */}
    </div>
  );
}
