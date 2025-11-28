import { Circle, Monitor } from "lucide-react";

const Sessions = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-semibold mb-2">Web sessions</h1>
        <p className="text-sm text-gray-600 mb-4">
          This is a list of devices that have logged into your account. Revoke
          any sessions that you do not recognize.
        </p>

        <div className="border border-gray-300 rounded-lg p-4 flex items-start justify-between bg-gray-50">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white rounded-md border border-gray-200">
              <Monitor className="w-8 h-8 text-gray-700" />
            </div>
            <div>
              <p className="text-gray-900 font-semibold">
                Hyderabad{" "}
                <span className="text-gray-600 text-sm">110.235.236.28</span>
              </p>
              <div className="flex items-center gap-2 mt-1">
                <Circle className="w-3 h-3 text-green-500 fill-green-500" />
                <p className="text-sm text-gray-700">active</p>
              </div>
              <p className="text-sm text-gray-600">Your current session</p>
              <p className="text-sm text-gray-600">Seen in IN</p>
            </div>
          </div>

          <button className="border border-gray-300 bg-white text-sm font-medium px-3 py-1 rounded-md hover:bg-gray-100">
            Details
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Heleno Mobile sessions</h2>
        <p className="text-sm text-gray-700 mb-2">
          Heleno Mobile can be used to verify your identity when signing in from
          a new device and as a two-factor authentication method.{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Learn more about authentication with Heleno Mobile.
          </a>
        </p>
        <p className="text-sm text-gray-700">
          To get started, install Heleno Mobile for{" "}
          <a href="#" className="text-blue-600 hover:underline">
            iOS
          </a>{" "}
          or{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Android
          </a>{" "}
          and sign in to your account.
        </p>
      </div>
    </div>
  );
};

export default Sessions;
