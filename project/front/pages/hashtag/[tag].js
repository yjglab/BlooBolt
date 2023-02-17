// Square 대신 Hashtag: ddd
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../../components/AppLayout";
import PostSection from "../../components/PostSection";
import PostForm from "../../components/PostForm";
import { LOAD_HASHTAG_POSTS_REQUEST } from "../../reducers/post";
import { useRouter } from "next/router";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Hashtag = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { tag } = router.query;
  const { me } = useSelector((state) => state.user);
  const { mainPosts, loadMorePosts, loadPostsLoading } = useSelector(
    (state) => state.post
  );
  const [togglePostForm, setTogglePostForm] = useState(false);

  useEffect(() => {
    function onScreenScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (loadMorePosts && !loadPostsLoading) {
          dispatch({
            type: LOAD_HASHTAG_POSTS_REQUEST,
            data: {
              lastPostId: mainPosts[mainPosts.length - 1]?.id,
              tag,
            },
          });
        }
      }
    }
    window.addEventListener("scroll", onScreenScroll);
    return () => {
      window.removeEventListener("scroll", onScreenScroll);
    };
  }, [loadMorePosts, loadPostsLoading, mainPosts.length, tag]);

  const onTogglePostForm = useCallback(() => {
    setTogglePostForm(!togglePostForm);
  }, [togglePostForm]);

  return (
    <AppLayout>
      <div className="flex pb-20">
        <div className="mt-16 px-2 sm:px-4 w-full h-full md:mx-0 relative ">
          <div className=" text-slate-600 text-2xl mb-8 flex justify-between items-center">
            <span className="relative font-bold left-1">Square</span>

            <div className="flex items-center">
              <div className="flex h-7">
                <input
                  type="text"
                  id="company-website"
                  className=" h-full border border-slate-400 outline-none bg-slate-50 placeholder:text-slate-300 w-28 flex-1 text-slate-600 focus:bg-slate-100 focus:ring-0 rounded-md mr-3  sm:text-sm"
                  placeholder="Search Post"
                />
              </div>
            </div>
          </div>

          <div className="grid auto-cols-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
            {mainPosts.map((post) => (
              <PostSection key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Hashtag;
