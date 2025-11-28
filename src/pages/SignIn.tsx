import { Key } from "lucide-react";
import type React from "react";

const SignIn: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-between bg-white text-black dark:bg-black dark:text-white px-6 py-10">
      {/* Top - Skip Button */}
      <div className="w-full max-w-md flex justify-end">
        <button className="text-sm underline text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white">
          Sign Up Later
        </button>
      </div>

      {/* Title */}
      <div className="w-full max-w-md text-center mb-10">
        <p className="text-2xl font-semibold tracking-tight">BookVerse</p>
      </div>

      {/* Form */}
      <div className="w-full max-w-md bg-white dark:bg-neutral-900 p-8 rounded-xl shadow-lg border border-black/10 dark:border-white/10">
        <form className="w-full">
          <p className="text-xl font-bold mb-6 text-center">
            Log in or Sign up
          </p>

          {/* SSO Button */}
          <button
            type="button"
            className="
              w-full flex items-center justify-center gap-2 
              bg-blue-600 hover:bg-blue-700 
              text-white font-medium py-3 rounded-lg 
              transition-all
            "
          >
            <Key className="w-5 h-5" /> Log in with your organization (SSO)
          </button>

          {/* Divider */}
          <div className="my-6 flex items-center w-full">
            <div className="flex-1 h-px bg-black/20 dark:bg-white/20" />
            <span className="px-3 text-black/50 dark:text-white/50">or</span>
            <div className="flex-1 h-px bg-black/20 dark:bg-white/20" />
          </div>

          {/* Create New Account */}
          <button
            type="button"
            className="
              w-full text-center py-3 font-medium 
              border border-black/20 dark:border-white/20 
              rounded-lg hover:bg-black/5 dark:hover:bg-white/10 
              transition-all
            "
          >
            New to BookVerse? Create an Account!
          </button>
        </form>
      </div>

      {/* Footer */}
      <div className="w-full max-w-md text-center mt-8 px-4 text-sm text-gray-600 dark:text-gray-400">
        <p>
          By creating an account under any method above, you accept BookVerse{" "}
          <a
            className="underline hover:text-black dark:hover:text-white"
            href="#"
          >
            Terms of Use
          </a>{" "}
          and{" "}
          <a
            className="underline hover:text-black dark:hover:text-white"
            href="#"
          >
            Privacy Notice
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default SignIn;
