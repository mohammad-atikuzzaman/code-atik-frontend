import { RootState } from "@/app/store";
import { logout } from "@/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { User, LogOut, Mail, Key, Calendar, Edit, Smartphone } from "lucide-react";

const ProfileCard = () => {
  const { email, role, } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // Format the creation date
  const formattedDate = new Date( Date.now()).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  if (!email) {
    return (
      <div className="w-full max-w-[95vw] sm:max-w-md mx-auto p-4 sm:p-6 bg-white rounded-lg shadow-sm sm:shadow-md">
        <div className="text-center py-4 sm:py-6">
          <p className="text-gray-600 text-sm sm:text-base">Please sign in to view your profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[95vw] sm:max-w-md mx-auto bg-white rounded-lg shadow-sm sm:shadow-md overflow-hidden">
      {/* Card Header - Responsive with different padding and font sizes */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 sm:p-6 text-white">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-white/20 flex items-center justify-center">
            <User className="h-5 w-5 sm:h-7 sm:w-7" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-sm sm:text-lg md:text-xl font-bold truncate">{email}</h2>
            <p className="text-xs sm:text-sm opacity-90 capitalize mt-0.5 sm:mt-1">{role} Account</p>
          </div>
          {/* Mobile-only edit button */}
          <button 
            onClick={() => navigate("/dashboard/profile/edit")}
            className="sm:hidden p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <Edit className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Card Body - Responsive spacing and layout */}
      <div className="p-4 sm:p-6">
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-start">
            <div className="bg-purple-100 p-1.5 sm:p-2 rounded-lg mr-3 sm:mr-4">
              <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-gray-500">Email Address</p>
              <p className="text-sm sm:text-base font-medium truncate">{email}</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-pink-100 p-1.5 sm:p-2 rounded-lg mr-3 sm:mr-4">
              <Key className="h-4 w-4 sm:h-5 sm:w-5 text-pink-600" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-500">Account Role</p>
              <p className="text-sm sm:text-base font-medium capitalize">{role}</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="bg-blue-100 p-1.5 sm:p-2 rounded-lg mr-3 sm:mr-4">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs sm:text-sm text-gray-500">Member Since</p>
              <p className="text-sm sm:text-base font-medium">{formattedDate}</p>
            </div>
          </div>

          {/* Additional responsive field - shows on mobile only */}
          <div className="sm:hidden flex items-start">
            <div className="bg-green-100 p-1.5 rounded-lg mr-3">
              <Smartphone className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Device</p>
              <p className="text-sm font-medium">Mobile View</p>
            </div>
          </div>
        </div>

        {/* Card Footer - Responsive button layout */}
        <div className="mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:justify-between space-y-2 sm:space-y-0">
          {/* <button
            onClick={() => navigate("/dashboard/profile/edit")}
            className="flex items-center justify-center sm:justify-start text-purple-600 hover:text-purple-800 transition-colors text-sm sm:text-base"
          >
            <Edit className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            Edit Profile
          </button> */}
          <button
            onClick={handleLogout}
            className="flex items-center justify-center sm:justify-start text-red-600 hover:text-red-800 transition-colors text-sm sm:text-base"
          >
            <LogOut className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;