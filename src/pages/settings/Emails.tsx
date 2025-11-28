import { CheckCircle, Plus } from "lucide-react";

const Emails = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-2">Emails</h1>
      <hr className="border-b border-gray-200" />

      <p className="text-sm text-gray-600 mt-2 mb-8">
        Emails you can use to sign in to your account. Verified emails can be
        used as the author or committer addresses for web-based Heleno
        operations.
      </p>

      <div className="border border-gray-300 rounded-md p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-medium text-gray-800">
              foryou@gmail.com{" "}
              <span className="ml-2 text-sm text-gray-500">Primary</span>
            </h2>
            <p className="text-sm text-gray-500">
              Verified · Connected to Google
            </p>
          </div>
          <CheckCircle className="text-green-500 w-5 h-5" />
        </div>

        <p className="text-sm text-gray-600 mt-3">
          This email address is the default for Heleno notifications.
        </p>
      </div>

      <div className="border border-gray-300 rounded-md p-4 mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Add email address <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="Email address"
            className="flex-1 border border-gray-300 rounded-md p-2 focus:ring-1 focus:ring-blue-500 outline-none"
          />
          <button className="flex items-center gap-1 bg-gray-200 px-4 py-2 rounded-md hover:bg-gray-300">
            <Plus size={16} /> Add
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="font-medium text-gray-800 mb-2">
          Primary email address
        </h3>
        <p className="text-sm text-gray-600 mb-3">
          Select an email to be used for account-related notifications and can
          be used for password reset.
        </p>

        <select className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none">
          <option>foryou@gmail.com</option>
        </select>
      </div>

      <div className="mb-8">
        <h3 className="font-medium text-gray-800 mb-2">Backup email address</h3>
        <p className="text-sm text-gray-600 mb-3">
          Your backup GitHub email address will be used as an additional
          destination for security-relevant account notifications and can also
          be used for password resets.
        </p>

        <select className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none">
          <option>foryou@gmail.com</option>
        </select>
      </div>
    </div>
  );
};

export default Emails;
