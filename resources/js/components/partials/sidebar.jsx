import { sidebarLink } from "@/constant/sidebar-link";
import { Link } from "@inertiajs/react";

export default function Sidebar() {
  return (
    <div className="flex-1">
      <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-4">
        {sidebarLink.map((value, index) => {
          const IconComponent = value.imageIcon;
          return (
            <Link
              key={index}
              href={value.route}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <IconComponent className="h-5 w-5" />
              {value.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
