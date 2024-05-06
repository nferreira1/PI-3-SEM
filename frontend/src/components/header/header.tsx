import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import SideMenu from "./side-menu";

const Header = () => {
  return (
    <Card className="rounded-none lg:px-32">
      <CardContent className="p-5 flex flex-row justify-between">
        <Link href="/">
          <Image
            src="/logo-header.png"
            alt="Logo da SysClub"
            height={30}
            width={200}
          />
        </Link>
        <SideMenu />
      </CardContent>
    </Card>
  );
};

export default Header;
