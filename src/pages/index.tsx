import conf from "conf";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { axios } from "src/api/axios";
import Button from "src/components/Button";
import Footer from "src/components/Footer";
import Navbar from "src/components/Navbar";
import UserContext from "src/contexts/UserContext";
import { useAppDispatch } from "src/redux/hooks";
const debug = require("debug")("app:Landing");

export default function Landing() {
  const { user } = useContext(UserContext);
  const [resp, setResp] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    axios
      .get("/api/users/1")
      .then((response: any) => {
        console.log("Landing Page response", response.data);
        setResp(response.data);
      })
      .catch((error: any) => {
        console.error(error);
      });
  }, []);

  // const goToNewBoard = useCallback(async () => {
  //   if (!user?.id) {
  //     dispatch(logErrorMessage("You need to be logged in to create a board"));
  //     return;
  //   }

  //   try {
  //     const board = await BoardService.createDefaultBoard(user?.id);
  //     navigate(`/b/${board.id}`);
  //   } catch (err) {
  //     debug("Go to board on dashboard failed");
  //   }
  // }, [dispatch, navigate, user?.id]);

  return (
    <>
      <Head>
        <title>{conf.get("PROJECT_NAME")}</title>
        <meta
          name="description"
          content="Learn & earn to solidify your financial future"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar>
        <Link href="/login" className="font-medium mx-2">
          Login
        </Link>
      </Navbar>

      <div className="w-full p-8">
        <div className="px-4 pb-4 flex flex-col justify-center items-center">
          <div className="text-4xl flex flex-row font-bold mb-4">
            <div className="bx bx-rocket animate-wiggle text-black mx-1" />{" "}
            Welcome to Diced Digital
          </div>
          {/* <Button onClick={goToNewBoard}> */}
          <Button onClick={() => router.push("/signup")}>
            Get Started
            <i className="bx bx-right-arrow-alt ml-1" />
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
}
