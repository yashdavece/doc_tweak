import { Link } from "react-router-dom";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

export function Navigation() {
  return (
    <NavigationMenu className="max-w-screen-xl mx-auto p-4 flex justify-between items-center">
      <NavigationMenuList className="hidden md:flex space-x-4">
        <NavigationMenuItem>
          <Link to="/" className={navigationMenuTriggerStyle()}>
            DocTweak
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/business" className={navigationMenuTriggerStyle()}>
            Business
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/students" className={navigationMenuTriggerStyle()}>
            Students
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/how-it-works" className={navigationMenuTriggerStyle()}>
            How It Works
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/contact" className={navigationMenuTriggerStyle()}>
            Contact
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
