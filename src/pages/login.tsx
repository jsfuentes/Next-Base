import conf from "conf";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import Button from "src/components/Button";
import { TelephoneInput, TextInput } from "src/components/Inputs";
import Logo from "src/components/Logo";
import UserContext from "src/contexts/UserContext";
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

  const onSubmit = (data: UserForm) => {
    console.log(data);

    alert("Successfully submitted form");

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

              <div className="w-full text-center text-xl font-medium">OR</div>

              <TelephoneInput
                className="mt-2"
                control={control}
                errors={errors}
                name="phone"
                title="Cell Number"
              />

              <div className="w-3/4 bg-gray-500 h-px my-8 mx-auto" />

              <TextInput
                className="mt-8 mb-4"
                name="password"
                title="Password"
                register={register}
                errors={errors}
                required
                type="password"
              />

              <div className="flex flex-col justify-center items-center mt-8 mx-auto w-full">
                {/*  eslint-disable-next-line react/no-unescaped-entities */}
                <Button type="submit" size="lg" className="px-14">
                  Let's Go
                </Button>
                <div className="font-medium mt-2 text-gray-500 cursor-pointer hover:text-gray-700">
                  Forgot Password?
                </div>
                <div
                  className="font-medium text-gray-500 cursor-pointer hover:text-gray-700"
                  onClick={() => router.push("/signup")}
                >
                  Don't have an account? Signup
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
