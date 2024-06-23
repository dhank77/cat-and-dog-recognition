import { Home, User, Settings } from "lucide-react";

export const sidebarLink = [
  {
    imageIcon : Home,
    route : '/admin',
    label : 'Dashboard'
  },
  {
    imageIcon : User,
    route : '/profil',
    label : 'My Profile'
  },
  {
    imageIcon : Settings,
    route : '/change-password',
    label : 'Change Password'
  },
]
