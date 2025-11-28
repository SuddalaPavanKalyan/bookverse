import { Pencil } from "lucide-react";

const Profile = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">Public profile</h1>

      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex-1 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder=""
            />
            <p className="text-sm text-gray-500 mt-1">
              Your name may appear around GitHub where you contribute or are
              mentioned. You can remove it at any time.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Public email
            </label>
            <select className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none">
              <option>Select a verified email to display</option>
              <option value="helenoforyou@gmail.com">
                helenoforyou@gmail.com
              </option>{" "}
            </select>
            <p className="text-sm text-gray-500 mt-1">
              You can manage verified email addresses in your{" "}
              <a href="#" className="text-blue-600 hover:underline">
                email settings
              </a>
              .
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Bio
            </label>
            <textarea
              rows={3}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder="Tell us a little bit about yourself"
            />
            <p className="text-sm text-gray-500 mt-1">
              You can{" "}
              <span className="text-gray-800 font-medium">@mention</span> other
              users and organizations to link to them.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pronouns
            </label>
            <select className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none">
              <option>Don't specify</option>
              <option value={"they/them"}>they/them</option>
              <option value="she/her">she/her</option>
              <option value="he/him">he/him</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none"
              placeholder=""
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <h2 className="text-sm font-medium text-gray-700 mb-2">
            Profile picture
          </h2>
          <div className="relative">
            <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center">
              <div className="w-20 h-20 bg-teal-300 rounded-md"></div>
            </div>
            <button className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white border border-gray-300 rounded-md px-2 py-1 text-sm flex items-center gap-1 hover:bg-gray-50 shadow-sm">
              <Pencil size={14} /> Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
