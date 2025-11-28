import {
  Apple,
  KeyRound,
  Lock,
  Mail,
  MoreHorizontal,
  ShieldCheck
} from "lucide-react";

const PasswordAndSecurity = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-semibold mb-4">Sign in methods</h1>
        <div className="border border-gray-300 rounded-lg divide-y divide-gray-200">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-800">Email</p>
                <p className="text-sm text-gray-600">
                  1 verified email configured
                </p>
              </div>
            </div>
            <button className="text-sm font-medium text-blue-600 hover:underline">
              Manage
            </button>
          </div>

          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-800">Password</p>
                <p className="text-sm text-gray-600">Not configured</p>
              </div>
            </div>
            <button className="text-sm font-medium text-blue-600 hover:underline">
              Set password
            </button>
          </div>

          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <KeyRound className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-800">Passkeys</p>
                <p className="text-sm text-gray-600">
                  Passwordless sign-in with biometrics or security keys
                </p>
              </div>
            </div>
            <button className="text-sm font-medium text-blue-600 hover:underline">
              Add passkey
            </button>
          </div>

          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-800">Google</p>
                <p className="text-sm text-gray-600">1 account connected</p>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-md">
              <MoreHorizontal className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Apple className="w-5 h-5 text-gray-600" />
              <div>
                <p className="font-medium text-gray-800">Apple</p>
                <p className="text-sm text-gray-600">
                  Sign in with your Apple account
                </p>
              </div>
            </div>
            <button className="text-sm font-medium text-blue-600 hover:underline">
              Connect
            </button>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4 border-t pt-6">
          Two-factor authentication
        </h2>

        <div className="flex flex-col items-center text-center border border-gray-300 rounded-lg p-10 bg-gray-50">
          <Lock className="w-8 h-8 mb-3 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-800">
            Two-factor authentication is not enabled yet.
          </h3>
          <p className="text-sm text-gray-600 mt-2 max-w-md">
            Two-factor authentication adds an additional layer of security to
            your account by requiring more than just a password to sign in.
          </p>

          <button className="mt-5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-4 py-2 rounded-md">
            Enable two-factor authentication
          </button>

          <button className="mt-3 text-sm text-blue-600 hover:underline">
            Learn more
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordAndSecurity;
