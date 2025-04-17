
import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { User } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  
  if (!user) return null;

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Profile</h1>
        <p className="text-cred-silver">
          Manage your personal information
        </p>
      </div>

      <Card className="dashboard-card mb-6">
        <div className="flex flex-col sm:flex-row items-center p-6">
          <div className="flex justify-center items-center w-20 h-20 rounded-full bg-cred-dark-gray border border-cred-silver/20 mb-4 sm:mb-0 sm:mr-6">
            <User className="h-10 w-10 text-cred-silver" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-cred-silver">{user.email}</p>
            <div className="mt-3 px-3 py-1 bg-green-400/10 text-green-400 text-xs rounded-full inline-flex items-center">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-1.5"></div>
              Account Linked
            </div>
          </div>
        </div>
      </Card>

      <div className="text-center text-cred-silver p-8">
        <p>Profile settings would be available here in the full version.</p>
      </div>
    </AppLayout>
  );
};

export default Profile;
