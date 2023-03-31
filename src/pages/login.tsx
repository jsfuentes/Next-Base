import conf from "conf";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { axios } from "src/api/axios";
import Button from "src/components/Button";
import GoogleButton from "src/components/GoogleButton";
import { TextInput } from "src/components/Inputs";
import Logo from "src/components/Logo";
import UserContext from "src/contexts/UserContext";
import { useAppDispatch } from "src/redux/hooks";
import { logErrorMessage } from "src/redux/notification";
const debug = require("debug")("app:pages:Login");

//Can set "route" and "msg" with query params
export default function Login() {
  const { user } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserForm>();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: UserForm) => {
    console.log(data);

    try {
      const resp = await axios.post("/users/login", data);

      console.log("RESP", resp);
      if (resp.data.access_token) {
        router.push("/onboarding");
      }
    } catch (err) {
      console.error(err);
      dispatch(logErrorMessage("Invalid email or password"));
    }

    // toast("Successfully submitted form");
  };

  // const params = queryString.parse(location.search);

  // useEffect(() => {
  //   if (user && user.type === "organizer") {
  //     navigate("/dashboard");
  //   }
  // }, [user, navigate]);

  // useEffect(() => {
  //   debug(params);
  // }, [params]);

  return (
    <div className="h-screen w-screen bg-gray-100 flex flex-col">
      <Head>
        <title>Login | {conf.get("PROJECT_NAME")}</title>
      </Head>
      <Logo className="mt-6 mx-8" urlOnClick={conf.get("LANDING_URL")} />
      <div className="w-full flex-1 flex items-center justify-center mb-20">
        <div className="flex flex-col justify-center items-center w-full">
          <div className="w-11/12 md:w-full max-w-lg relative border border-gray-200 bg-white px-8 py-8 rounded-lg">
            <div className="font-medium text-3xl mb-8 w-full text-center">
              Welcome Back!
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextInput
                className="my-2"
                name="email"
                title="Email"
                register={register}
                errors={errors}
                required
                pattern={/^\S+@\S+$/i}
              />

              <TextInput
                className="mt-8 mb-4"
                name="password"
                title="Password"
                register={register}
                errors={errors}
                required
                type="password"
              />
              <div className="font-medium mt-2 text-sm text-gray-500 cursor-pointer hover:text-gray-700">
                Forgot Password?
              </div>

              <div className="flex flex-col justify-center items-center mt-8 mx-auto w-full">
                {/*  eslint-disable-next-line react/no-unescaped-entities */}
                <Button
                  type="submit"
                  size="lg"
                  className="px-14"
                  variant="reverse-primary"
                >
                  Let's Go
                </Button>

                <div className="flex flex-row justify-between items-center w-full my-4">
                  <div className="h-px bg-gray-400 flex-1 mr-3" />

                  <div className="text-center text-xl text-gray-400">or</div>
                  <div className="h-px bg-gray-400 flex-1 ml-3" />
                </div>

                <GoogleButton onSuccess={() => router.push("/dashboard")} />
              </div>

              <div className="flex flex-col justify-center items-center mt-4 mx-auto w-full">
                <div
                  className="font-medium text-gray-500 cursor-pointer hover:text-gray-700 text-sm"
                  onClick={() => router.push("/signup")}
                >
                  Don't have an account? Sign up
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
