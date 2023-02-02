import React from "react";
import { useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";
import Navigation from "../components/Navigation";

const Home = () => {
  const { me } = useSelector((state) => state.user);

  return (
    <AppLayout>
      <Navigation />
    </AppLayout>
  );
};

export default Home;
