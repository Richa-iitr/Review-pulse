"use client";
import classes from "../styles/Header.module.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import { LogInWithAnonAadhaar, useAnonAadhaar } from "anon-aadhaar-react";
import Wallets from "./Wallets";
const Header = () => {
  const [show, setShow] = useState(false);
  const pathname = usePathname();
  const [anonAadhaar] = useAnonAadhaar();
  const hideNav = (event) => {
    if (event.target.id === "link") setShow(false);
  };
  const activeClassName = (path) => (pathname === path ? classes.active : "");

  useEffect(() => {
    console.log("Anon Aadhaar Status : ", anonAadhaar);
  }, [anonAadhaar]);
  return (
    <header className={classes.header}>
      <Link href={"/"} className={classes.logo}>
        <h1 className={classes["logo-text"]}>Review Pulse</h1>
      </Link>
      <div className={classes.hamburger}>
        {show ? (
          <AiOutlineClose size={30} onClick={() => setShow(false)} />
        ) : (
          <RxHamburgerMenu size={30} onClick={() => setShow(true)} />
        )}
      </div>

      <nav
        className={`${classes.navigation} ${show ? classes.active : ""}`}
        onClick={hideNav}
      >
        <ul>
          {anonAadhaar.status === "logged-in" ? (
            <>
              <li>
                <Link id="link" className={activeClassName("/")} href="/">
                  Home
                </Link>
              </li>{" "}
              <li>
                <Wallets />
              </li>
              <LogInWithAnonAadhaar />
            </>
          ) : (
            <>
              <li>
                <Link className={activeClassName("/login")} href={"/login"}>
                  Login
                </Link>
              </li>
              <li>
                <Link className={activeClassName("/signup")} href={"/signup"}>
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
