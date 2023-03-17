import React from "react";
import AppLayout from "../../components/AppLayout";
import wrapper from "../../store/configureStore";
import axios from "axios";
import { loadMe } from "../../reducers/userSlice";
import TermsContent from "../../components/TermsContent";

const Terms = () => {
  return (
    <AppLayout>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-6 text-indigo-500">
              이용 동의서
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight  sm:text-4xl">
              서비스 이용 약관
            </p>
            <p className="mt-3 text-lg leading-8 ">
              공정거래위원회 표준약관 제10023호 (2015. 6. 26. 개정)
            </p>
          </div>

          <TermsContent />
        </div>
      </div>
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    await context.store.dispatch(loadMe());

    return {
      props: { message: "" },
    };
  }
);

export default Terms;
