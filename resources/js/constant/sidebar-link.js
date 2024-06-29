import { Home, User, Settings, Cpu, ScanEye } from "lucide-react";

export const sidebarLink = [
  {
    imageIcon : Home,
    route : '/admin/',
    label : 'Dashboard'
  },
  {
    imageIcon : ScanEye,
    route : '/admin/predict/',
    label : 'Predict Image'
  },
  {
    imageIcon : Cpu,
    route : '/admin/training',
    label : 'Training Model'
  },
  {
    imageIcon : User,
    route : '/admin/profile/',
    label : 'My Profile'
  },
  {
    imageIcon : Settings,
    route : '/admin/change-password/',
    label : 'Change Password'
  },
]
