import conf from "conf";
import Head from "next/head";
import Image from "next/image";
import { useContext } from "react";
import AppNavbar from "src/components/AppNavbar";
import Footer from "src/components/Footer";
import UserContext from "src/contexts/UserContext";
import { useRequireLoggedIn } from "src/utils/auth";
const debug = require("debug")("app:Profile");

interface ProfileProps {}

export default function Profile(props: ProfileProps) {
  const { user } = useContext(UserContext);
  useRequireLoggedIn();

  if (!user) return null;

  return (
    <div>
      <Head>
        <title>{conf.get("PROJECT_NAME")}</title>
        <meta
          name="description"
          content="Learn & earn to solidify your financial future"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppNavbar />
      <div className="w-full p-8 container mx-auto">
        <div className="px-4 pb-4 flex flex-col justify-center items-center">
          <div className="text-4xl flex flex-row font-bold mb-4">
            Student Profile
          </div>

          <div className="flex flex-row justify-between items-start">
            {user.picture && (
              <div className="w-48 h-48 relative">
                <Image src={user.picture} alt="Profile Picture" fill />
              </div>
            )}

            <div className="flex flex-col justify-center ml-8">
              <div className="text-lg mb-2">Name: {user.name}</div>
              <div className="text-lg my-2">Email: {user.email}</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
