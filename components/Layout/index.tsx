import Head from "next/head";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useSession } from "next-auth/react";
import { Menu } from "@headlessui/react";
import Dropdown from "../Dropdown";

interface LayoutProps {
  children?: React.ReactNode;
  title?: string;
}
export default function Layout({ children, title }: LayoutProps) {
  const { status, data: session } = useSession();
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const { items } = useAppSelector((state) => state.cart);
  useEffect(() => {
    setCartItemsCount(items.length);
  }, [items]);

  return (
    <>
      <Head>
        <title>{title ? `${title} - Amazona` : "Amazona"}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-12 justify-between items-center shadow-md px-4">
            <Link className="text-lg font-bold" href={"/"}>
              Amazona
            </Link>
            <div className="">
              <Link className="p-2" href={"/cart"}>
                Cart
                {cartItemsCount > 0 && (
                  <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                    {cartItemsCount}
                  </span>
                )}
              </Link>

              {status === "loading" ? (
                "Loading"
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block">
                  <Menu.Button className="text-blue-400">
                    {session?.user.name}
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 w-56 origin-top-right shadow-lg">
                    <Menu.Item>
                      <Dropdown className="dropdown-link" href="/profile">
                        Profile
                      </Dropdown>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link className="p-2" href={"/auth/login"}>
                  Login
                </Link>
              )}
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex  justify-center items-center shadow-inner">
          <p>Copyright ©️ 2023 - Amazona</p>
        </footer>
      </div>
    </>
  );
}