import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const {
    handleSubmit,
    register,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const [visibilityPass, setVisibilityPass] = useState("visibility");
  const [visibilityRePass, setVisibilityRePass] = useState("visibility");
  const [showPass, setShowPass] = useState("password");
  const [showRePass, setShowRePass] = useState("password");
  const [serverError, setServerError] = useState("");

  const handlePassVisibility = () => {
    setVisibilityPass((val) =>
      val === "visibility" ? "visibility_off" : "visibility"
    );
    setShowPass((val) => (val === "password" ? "text" : "password"));
  };

  const handleRePassVisibility = () => {
    setVisibilityRePass((val) =>
      val === "visibility" ? "visibility_off" : "visibility"
    );
    setShowRePass((val) => (val === "password" ? "text" : "password"));
  };

  const resetVisibility = () => {
    setVisibilityPass("visibility");
    setShowPass("password");
    setVisibilityRePass("visibility");
    setShowRePass("password");
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
      let res = await fetch("http://localhost:8001/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      let result = await res.json();
      console.log(data, result);

      if (res.status === 201) {
        navigate("/");
        reset();
        resetVisibility();
      }

      if (res.status !== 201) {
        console.log(result.message);
        throw new Error(result.message);
      }
    } catch (error) {
      if (error.name === "TypeError") {
        // Network error (e.g., server is down)
        setServerError("Server not responding");
      } else {
        setServerError(error.message);
      }
    }
  };

  const watchPass = watch("password");

  return (
    <>
      <div className="flex justify-center items-center h-[80vh]">
        <div className="bg-blue-300 h-auto w-80 rounded-3xl">
          <form
            className="flex flex-col "
            action=""
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex gap-4 mx-6 mt-6 mb-4">
              <input
                className="rounded-full w-32 py-2 px-4 outline-none"
                type="text"
                {...register("firstName", {
                  required: {
                    value: true,
                    message: "First Name cannot be empty",
                  },
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "First Name cannot contain numbers",
                  },
                  minLength: { value: 3, message: "First Name is too short" },
                })}
                placeholder="First Name"
              />
              <input
                className="rounded-full w-32 py-2 px-4 outline-none"
                type="text"
                {...register("lastName", {
                  required: {
                    value: true,
                    message: "Last Name cannot be empty",
                  },
                  pattern: {
                    value: /^[A-Za-z]+$/,
                    message: "Last Name cannot contain numbers",
                  },
                  minLength: { value: 3, message: "Last Name is too short" },
                })}
                placeholder="Last Name"
              />
            </div>
            <div className="text-red-600 text-center">
              {errors.firstName ? errors.firstName.message : ""}
            </div>
            <div className="text-red-600 text-center">
              {errors.lastName ? errors.lastName.message : ""}
            </div>
            <input
              className="outline-none mx-6 my-4 rounded-full py-2 px-4"
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
                maxLength: { value: 20, message: "Username is too long" },
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
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                    message:
                      "Password must contain at least a lowercase letter, a uppercase letter, a number, and a special character",
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
            <div className="text-red-600 text-center">
              {errors.password ? (
                <div
                  className={`mx-4 ${
                    errors.password.type === "pattern"
                      ? "text-[0.795rem]"
                      : errors.password.type === "minLength"
                      ? "text-sm"
                      : "text-base"
                  }`}
                >
                  {errors.password.message}
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="flex items-center justify-between">
              <input
                {...register("confirmPassword", {
                  validate: (value) =>
                    value === watchPass || "Passwords do not match",
                })}
                className="outline-none my-4 ml-6 rounded-l-full w-full py-2 pl-4"
                type={showRePass}
                placeholder="Re-Enter Password"
              />
              <span
                onClick={handleRePassVisibility}
                className="cursor-pointer material-symbols-outlined text-gray-400 bg-white mr-6 pr-4 py-2 rounded-r-full"
              >
                {visibilityRePass}
              </span>
            </div>
            <div className="text-red-600 text-center">
              {errors.confirmPassword ? errors.confirmPassword.message : ""}
            </div>
            <input
              disabled={isSubmitting}
              className={` mx-6 rounded-full p-2 text-lg ${
                isSubmitting
                  ? "bg-teal-400 cursor-not-allowed my-6"
                  : "bg-teal-500 cursor-pointer mt-4 mb-6 "
              }`}
              type="submit"
              value="Register"
            />
            {isSubmitting ? (
              <div className=" flex gap-2 items-center justify-center mb-6">
                <div className="border-4 border-slate-100 border-t-blue-600 w-6 h-6 rounded-full animate-spin"></div>
                Submitting ...
              </div>
            ) : (
              ""
            )}
          </form>
          <div
            className={`text-red-600 text-center ${serverError ? "mb-6" : ""}`}
          >
            {serverError}
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
