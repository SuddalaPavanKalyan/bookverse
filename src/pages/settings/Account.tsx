const Account = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-1">Change username</h1>
      <hr className="border-b border-gray-200" />

      <div className="flex flex-col md:flex-row mt-5 gap-10">
        <div className="flex-1 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder=""
            />
            <p className="text-sm text-gray-500 mt-1">
              It may take a few minutes to reflect everywhere.
            </p>
          </div>

          <div>
            <label className="block text-xl font-medium text-red-700 mb-1">
              Delete Account
            </label>
            <hr className="border-b border-gray-200" />
            <p className="text-sm text-gray-500 mt-1 mb-3">
              Once you delete your account, there is no going back. Please be
              certain.{" "}
            </p>
            <button className="px-2 py-1 text-red-700 border border-gray-200 rounded-xl bg-gray-100">
              Delete your account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
