import { MenuIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import SideMenu from "./side-menu";

const Header = () => {
  return (
    <Card className="rounded-none">
      <CardContent className="p-5 flex flex-row justify-between">
        <Image
          src="/logo-header.png"
          alt="Logo da SysClub"
          height={30}
          width={200}
        />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon size={20} />
            </Button>
          </SheetTrigger>

          <SheetContent className="p-0">
            <SideMenu />
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  );
};

export default Header;