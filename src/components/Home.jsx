import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [serverError, setServerError] = useState("");
  const [visibilityPass, setVisibilityPass] = useState("visibility");
  const [showPass, setShowPass] = useState("password");

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const handlePassVisibility = () => {
    setVisibilityPass((val) =>
      val === "visibility" ? "visibility_off" : "visibility"
    );
    setShowPass((val) => (val === "password" ? "text" : "password"));
  };
  const resetVisibility = () => {
    setVisibilityPass("visibility");
    setShowPass("password");
  };

  const delay = (d) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, d * 1000);
    });
  };

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setServerError("");
    await delay(1);
    try {
      let res = await fetch("http://localhost:8001/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      let result = await res.json();
      console.log(data, result);

      if (res.status === 200) {
        navigate("/app");
      }
      if (res.status !== 200) {
        console.log(result.message);
        throw new Error(result.message);
      }

      reset();
      resetVisibility();
    } catch (error) {
      if (error.name === "TypeError") {
        // Network error (e.g., server is down)
        setServerError("Server not responding");
      } else {
        setServerError(error.message);
      }
    }
  };
  return (
    <>
      <div className="flex justify-center items-center h-[80vh]">
        <div className="bg-blue-300 h-auto w-80 rounded-3xl">
          <form
            className="flex flex-col "
            action=""
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className="outline-none mx-6 rounded-full py-2 px-4 my-6"
              {...register("username", {
                required: {
                  value: true,
                  message: "Username cannot be empty",
                },
                pattern: {
                  value: /^[A-Za-z][A-Za-z0-9]*$/,
                  message: "Username cannot start with a number",
                },
                minLength: { value: 3, message: "Username is too short" },
              })}
              type="text"
              placeholder="Username"
            />
            <div className="text-red-600 text-center">
              {errors.username ? errors.username.message : ""}
            </div>
            <div className="flex items-center justify-between">
              <input
                className="outline-none my-4 ml-6 rounded-l-full w-full py-2 pl-4"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password cannot be empty",
                  },
                  minLength: {
                    value: 7,
                    message: "Password must contain atleast 7 characters",
                  },
                })}
                type={showPass}
                placeholder="Password"
              />
              <span
                onClick={handlePassVisibility}
                className="cursor-pointer material-symbols-outlined text-gray-400 bg-white mr-6 pr-4 py-2 rounded-r-full"
              >
                {visibilityPass}
              </span>
            </div>
            {errors.password ? (
              <div
                className={`text-red-600 text-center ${
                  errors.password.type === "minLength" ? "text-sm" : ""
                }`}
              >
                {errors.password ? errors.password.message : ""}
              </div>
            ) : (
              ""
            )}
            <input
              disabled={isSubmitting}
              className={` mx-6 rounded-full p-2 text-lg ${
                isSubmitting
                  ? "bg-teal-400 cursor-not-allowed mt-6"
                  : `bg-teal-500 cursor-pointer ${
                      serverError ? "mt-6" : "m-6"
                    } `
              }`}
              type="submit"
              value="Log In"
            />

            {isSubmitting ? (
              <div className=" flex gap-2 items-center justify-center my-6">
                <div className="border-4 border-slate-100 border-t-blue-600 w-6 h-6 rounded-full animate-spin"></div>
                Submitting ...
              </div>
            ) : (
              ""
            )}
          </form>
          <div
            className={` text-red-600 text-center ${serverError ? "my-6" : ""}`}
          >
            {serverError}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
