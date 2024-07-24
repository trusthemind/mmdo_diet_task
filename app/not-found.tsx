// pages/404.tsx
import Link from "next/link";
import { FC } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
const Custom404: FC = () => {
  return (
    <Card style={{ textAlign: "center", padding: "50px" }}>
      <CardHeader>404</CardHeader>
      <CardBody>Sorry, the page you’re looking for doesn’t exist.</CardBody>
      <Link href="/" style={{textDecoration: "underline" }}>
        Go back to home
      </Link>
    </Card>
  );
};

export default Custom404;
