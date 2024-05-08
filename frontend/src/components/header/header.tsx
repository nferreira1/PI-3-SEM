import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import DropdownMenu from "./dropdown-menu";
import SideMenu from "./side-menu";

const Header = () => {
  return (
    <Card className="rounded-none xl:px-32">
      <CardContent className="p-5 flex">
        <Link href="/">
          <Image
            src="/logo-header.png"
            alt="Logo da SysClub"
            height={30}
            width={200}
          />
        </Link>

        <div className="inline-block ml-auto lg:hidden">
          <SideMenu />
        </div>

        <div className="hidden lg:inline-block lg:ml-auto">
          <DropdownMenu />
        </div>
      </CardContent>
    </Card>
  );
};

export default Header;
