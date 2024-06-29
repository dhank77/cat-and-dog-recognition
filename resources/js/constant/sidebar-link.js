import { Home, User, Settings } from "lucide-react";

export const sidebarLink = [
  {
    imageIcon : Home,
    route : '/admin/',
    label : 'Predict Image'
  },
  {
    imageIcon : User,
    route : '/profil/',
    label : 'Training Model'
  },
  {
    imageIcon : Settings,
    route : '/change-password/',
    label : 'Change Password'
  },
]
