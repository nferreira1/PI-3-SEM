import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

const Header = () => {
  return (
    <Card>
      <CardContent className="p-5 flex flex-row justify-between">
        <Image
          src="/logo-header.png"
          alt="Logo da SysClub"
          height={30}
          width={200}
        />
        <Button variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button>
      </CardContent>
    </Card>
  );
};

export default Header;
