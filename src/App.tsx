import React from "react";
import { Route, Routes } from "react-router-dom";
import ExploreLayout from "./layouts/ExploreLayout";
import MainLayout from "./layouts/MainLayout";
import MyLibraryLayout from "./layouts/MyLibraryLayout";
import SettingsLayout from "./layouts/SettingsLayout";
import Borrowed from "./pages/mylibrary/Borrowed";
import CatalogCart from "./pages/mylibrary/CatalogCart";
import LibraryDashboard from "./pages/mylibrary/LibraryDashboard";
import Requested from "./pages/mylibrary/Requested";
import Reserved from "./pages/mylibrary/Reserved";
import Appearance from "./pages/settings/Appearance";
import Emails from "./pages/settings/Emails";
import PasswordAndSecurity from "./pages/settings/PasswordAndSecurity";
import Profile from "./pages/settings/Profile";
import ScheduledReminders from "./pages/settings/ScheduledReminders";
import Sessions from "./pages/settings/Sessions";
import SignIn from "./pages/SignIn";

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/" element={<MainLayout />}>
          <Route path="/explore" element={<ExploreLayout />} />
          <Route path="/my-library" element={<MyLibraryLayout />}>
            <Route path="cart" element={<CatalogCart />} />
            <Route index path="" element={<LibraryDashboard />} />
            <Route path="requested" element={<Requested />} />
            <Route path="reserved" element={<Reserved />} />
            <Route path="borrowed" element={<Borrowed />} />
          </Route>
        </Route>
        <Route path="/settings/" element={<SettingsLayout />}>
          <Route index element={<Profile />} />
          <Route path="profile" element={<Profile />} />
          <Route path="account" element={<Account />} />
          <Route path="appearance" element={<Appearance />} />
          <Route path="accessibility" element={<Accessibility />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="billing" element={<Billing />} />
          <Route path="emails" element={<Emails />} />
          <Route path="security" element={<PasswordAndSecurity />} />
          <Route path="sessions" element={<Sessions />} />
          <Route path="moderation" element={<Moderation />} />
          <Route path="security-analysis" element={<YourSecurity />} />
          <Route path="reminders" element={<ScheduledReminders />} />
          <Route path="security-log" element={<SecurityLog />} />
          <Route path="sponsorship-log" element={<SponsorshipLog />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;

const Account = () => {
  return <div>Account</div>;
};

const Accessibility = () => {
  return (
    <div className="flex items-center justify-center h-full text-5xl font-bold">
      Accessibility
    </div>
  );
};

const Notifications = () => {
  return (
    <div className="flex items-center justify-center h-full text-5xl font-bold">
      Notifications
    </div>
  );
};

const Billing = () => {
  return (
    <div className="flex items-center justify-center h-full text-5xl font-bold">
      Billing and Licensing
    </div>
  );
};

const Moderation = () => {
  return (
    <div className="flex items-center justify-center h-full text-5xl font-bold">
      Moderation
    </div>
  );
};

const YourSecurity = () => {
  return (
    <div className="flex items-center justify-center h-full text-5xl font-bold">
      Code Security
    </div>
  );
};

const SecurityLog = () => {
  return (
    <div className="flex items-center justify-center h-full text-5xl font-bold">
      Security Log
    </div>
  );
};

const SponsorshipLog = () => {
  return (
    <div className="flex items-center justify-center h-full text-5xl font-bold">
      Sponsorship Log
    </div>
  );
};

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-full text-5xl font-bold">
      Not Found
    </div>
  );
};
