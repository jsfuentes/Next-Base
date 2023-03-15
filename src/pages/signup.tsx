import conf from "conf";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import Button from "src/components/Button";
import {
  CheckboxInput,
  NumberInput,
  SelectInput,
  TelephoneInput,
  TextInput,
} from "src/components/Inputs";
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
    getValues,
    formState: { errors },
  } = useForm<UserForm>();
  const router = useRouter();

  const onSubmit = (data: UserForm) => {
    console.log(data);
    alert("Successfully submitted form");
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
            <div className="font-medium text-2xl mb-4">
              Receive Bitcoin Just For Signing Up!
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextInput
                className="my-4"
                name="name"
                title="First Name"
                register={register}
                errors={errors}
                required
                maxLength={80}
              />
              <TextInput
                className="my-4"
                name="email"
                title="Email"
                register={register}
                errors={errors}
                required
                pattern={/^\S+@\S+$/i}
              />
              <TextInput
                className="my-4"
                name="password"
                title="Password"
                register={register}
                errors={errors}
                required
                type="password"
              />
              <TextInput
                className="my-4"
                name="password_confirmation"
                title="Confirm Password"
                register={register}
                errors={errors}
                required
                type="password"
                validate={(value) => {
                  const { password } = getValues();
                  debug("TEST", password, value, password === value);
                  return password === value || "Passwords should match!";
                }}
              />
              <TelephoneInput
                className="my-4"
                control={control}
                errors={errors}
                name="phone"
                title="Cell Number"
              />
              <NumberInput
                className="my-4"
                min={1000}
                max={9999}
                name="ssn"
                title="Last 4 Digits of Your Social Security Number"
                register={register}
                errors={errors}
                required
              />
              <SelectInput
                className="my-4"
                title="Grade"
                register={register}
                errors={errors}
                name="grade"
                options={[
                  { label: "1st", value: "1st" },
                  { label: "2nd", value: "2nd" },
                  { label: "3rd", value: "3rd" },
                  { label: "4th", value: "4th" },
                  { label: "5th", value: "5th" },
                  { label: "6th", value: "6th" },
                  { label: "7th", value: "7th" },
                  { label: "8th", value: "8th" },
                  { label: "9th", value: "9th" },
                  { label: "10th", value: "10th" },
                  { label: "11th", value: "11th" },
                  { label: "12th", value: "12th" },
                ]}
                required
              />
              <NumberInput
                className="my-4"
                min={10000}
                max={99999}
                name="school_code"
                title="5-Digit School Code"
                register={register}
                errors={errors}
                required
              />

              <CheckboxInput
                className="my-4"
                register={register}
                title="Signup for Newsletter"
                name="newsletter"
              />

              <div className="flex flex-col justify-center items-center mt-8 mx-auto w-full">
                <Button type="submit" size="lg" className="px-14">
                  Submit
                </Button>
                <div
                  className="font-medium mt-2 text-gray-500 cursor-pointer hover:text-gray-700"
                  onClick={() => router.push("/login")}
                >
                  Already have an account? Login
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
