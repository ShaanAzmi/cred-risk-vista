import { AppLayout } from "@/components/AppLayout";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { User, Phone, MapPin, CreditCard, ShieldCheck } from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  
  const mockUserData = {
    name: "Rajesh Kumar Sharma",
    email: "rajesh.sharma@email.com",
    phone: "+91 98765 43210",
    address: "42/B, Nehru Street, Jayanagar, Bangalore - 560041",
    banks: ["HDFC Bank", "SBI Bank", "Axis Bank"],
  };

  if (!user) return null;

  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Profile</h1>
        <p className="text-cred-silver">
          Manage your personal information
        </p>
      </div>

      <div className="space-y-6">
        {/* Basic Info Card */}
        <Card className="dashboard-card">
          <div className="flex flex-col sm:flex-row items-center p-6">
            <div className="flex justify-center items-center w-20 h-20 rounded-full bg-cred-dark-gray border border-cred-silver/20 mb-4 sm:mb-0 sm:mr-6">
              <User className="h-10 w-10 text-cred-silver" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{mockUserData.name}</h2>
              <p className="text-cred-silver">{mockUserData.email}</p>
              <div className="mt-3 px-3 py-1 bg-green-400/10 text-green-400 text-xs rounded-full inline-flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 mr-1.5"></div>
                Account Linked
              </div>
            </div>
          </div>
        </Card>

        {/* Contact Details */}
        <Card className="dashboard-card">
          <div className="p-6 space-y-4">
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            
            <div className="flex items-center gap-3">
              <Phone className="h-5 w-5 text-cred-yellow" />
              <div>
                <p className="text-sm text-cred-silver">Phone Number</p>
                <p className="font-medium">{mockUserData.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-cred-yellow" />
              <div>
                <p className="text-sm text-cred-silver">Address</p>
                <p className="font-medium">{mockUserData.address}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Bank Accounts */}
        <Card className="dashboard-card">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Linked Bank Accounts</h3>
            <div className="space-y-3">
              {mockUserData.banks.map((bank, index) => (
                <div key={index} className="flex items-center gap-3 border border-cred-yellow/20 rounded-lg p-3">
                  <CreditCard className="h-5 w-5 text-cred-yellow" />
                  <span>{bank}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Verification Status */}
        <Card className="dashboard-card">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Verification Status</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 border border-green-500/20 rounded-lg p-3 bg-green-500/5">
                <ShieldCheck className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">Aadhar Card Verified</p>
                  <p className="text-sm text-cred-silver">Your identity has been verified</p>
                </div>
              </div>
              <div className="flex items-center gap-3 border border-green-500/20 rounded-lg p-3 bg-green-500/5">
                <ShieldCheck className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-medium">PAN Card Verified</p>
                  <p className="text-sm text-cred-silver">Your tax information has been verified</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Profile;
