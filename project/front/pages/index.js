import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Home = () => {
  const { me } = useSelector((state) => state.user);

  // const liked = post.Likers.find((v) => v.id === id);
  return <AppLayout></AppLayout>;
};

export default Home;
