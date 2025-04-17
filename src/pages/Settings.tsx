
import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { Settings as SettingsIcon } from "lucide-react";

const Settings = () => {
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-cred-silver">
          Configure your account settings
        </p>
      </div>

      <Card className="dashboard-card mb-6">
        <div className="flex flex-col items-center p-10 text-center">
          <SettingsIcon className="h-12 w-12 text-cred-yellow mb-4" />
          <h2 className="text-xl font-semibold mb-2">Account Settings</h2>
          <p className="text-cred-silver max-w-md">
            Settings would be available here in the full version. This includes notification preferences, security settings, and more.
          </p>
        </div>
      </Card>
    </AppLayout>
  );
};

export default Settings;
