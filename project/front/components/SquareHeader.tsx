import { Menu } from '@headlessui/react';
import { ArrowUturnLeftIcon, DocumentPlusIcon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import NewPostForm from './NewPostForm';
import PostForm from './PostForm';
import PostLoading from './PostLoading';
import PostSection from './PostSection';
import { openNotice } from '../reducers/global';
import {
  cancelAllPostImages,
  flushMainPosts,
  loadPosts,
  loadPostsByHashtag,
  loadPostsByKeyword,
} from '../reducers/post';
import { useAppDispatch, useAppSelector } from '../store/configureStore';

interface SquareHeaderProps {
  squareTitle: string;
  squareSubTitle: string;
  squareKind: string;
}
const SquareHeader: FC<SquareHeaderProps> = ({ squareTitle, squareSubTitle, squareKind }) => {
  const { me } = useAppSelector((state) => state.user);
  const [togglePostForm, setTogglePostForm] = useState(false);

  const { mainPosts, loadMorePosts, loadPostsLoading } = useAppSelector((state) => state.post);
  const [keywordSearching, setKeywordSearching] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const router = useRouter();
  const { tag } = router.query;

  const dispatch = useAppDispatch();

  interface SearchPostValues {
    keyword: string;
  }
  const {
    register,
    reset,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SearchPostValues>({
    mode: 'onSubmit',
  });

  useEffect(() => {
    function onScreenScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (router.query.tag && loadMorePosts && !loadPostsLoading) {
          //   console.log("해시태그");
          //   const lastPostId = mainPosts[mainPosts.length - 1]?.id;
          //   dispatch(
          //     loadPostsByHashtag({
          //       lastPostId,
          //       tag,
          //     })
          //   );
        } else if (!router.query.tag && !keywordSearching && loadMorePosts && !loadPostsLoading) {
          console.log('일반');
          const lastPostId = mainPosts[mainPosts.length - 1]?.id;
          dispatch(loadPosts({ lastPostId, postUnique: squareKind }));
        } else if (!router.query.tag && keywordSearching && loadMorePosts && !loadPostsLoading) {
          //   console.log("서치");
          //   const lastPostId = mainPosts[mainPosts.length - 1]?.id;
          //   dispatch(loadPostsByKeyword({ keyword: searchKeyword, lastPostId }));
        }
      }
    }
    window.addEventListener('scroll', onScreenScroll);
    return () => {
      window.removeEventListener('scroll', onScreenScroll);
    };
  }, [loadMorePosts, loadPostsLoading, mainPosts, keywordSearching, router.query.tag, squareKind, dispatch]);

  const onTogglePostForm = useCallback(() => {
    if (me?.banned) {
      return dispatch(
        openNotice({
          type: 2,
          content: '최근 다수의 신고를 받아 이용이 정지된 계정입니다.',
        }),
      );
    }
    if (squareKind !== 'public' && squareKind !== me?.class) {
      return dispatch(
        openNotice({
          type: 2,
          content: '포스트는 퍼블릭 스퀘어와 자신의 스퀘어에만 업로드할 수 있습니다.',
        }),
      );
    }
    if (togglePostForm) {
      dispatch(cancelAllPostImages());
    }
    setTogglePostForm(!togglePostForm);
    return null;
  }, [togglePostForm, dispatch, me?.banned, me?.class, squareKind]);

  const onSearchPosts: SubmitHandler<SearchPostValues> = (formData) => {
    const { keyword } = formData;
    setSearchKeyword(keyword);
    if (!keyword || !keyword.trim() || keyword.length < 2) {
      return dispatch(openNotice({ type: 2, content: '2자리 이상의 검색어를 지정해주세요.' }));
    }

    setKeywordSearching(true);
    dispatch(flushMainPosts());
    dispatch(loadPostsByKeyword({ keyword }));
    return null;
  };

  const onRefresh = () => {
    if (router.query.tag) {
      router.back();
    }
    setKeywordSearching(false);
    dispatch(flushMainPosts());
    dispatch(loadPosts({ postUnique: squareKind }));
  };

  return (
    <>
      {me && togglePostForm && <NewPostForm onTogglePostForm={onTogglePostForm} squareKind={squareKind} />}
      <div className='min-h-screen flex pb-20'>
        <div className='mt-16 md:mt-20 px-2 sm:px-[2%] md:px-[2%] lg:px-[12%] w-full h-full relative '>
          <h1 className='px-6 text-base font-semibold leading-6 text-indigo-500'>
            {keywordSearching ? '어떤 포스트를 찾으시나요?' : squareSubTitle}
          </h1>
          <div className='px-5 h-10 text-2xl flex justify-between items-center'>
            <button
              type='button'
              onClick={onRefresh}
              className='cursor-pointer relative flex items-center font-bold left-1'
            >
              <h1 className=' text-2xl font-bold tracking-tight  sm:text-3xl'>
                {keywordSearching ? '키워드 검색' : squareTitle}
              </h1>

              {keywordSearching || router.query.tag ? (
                <ArrowUturnLeftIcon className='ml-3  w-5 hover:scale-110' />
              ) : null}
            </button>

            <div className='flex items-center'>
              {me && !keywordSearching && !router.query.tag ? ( // eslint-disable-line no-nested-ternary
                <button
                  type='button'
                  onClick={onTogglePostForm}
                  className=' flex h-10 gap-1.5 px-2 items-center justify-center rounded-lg bg-indigo-500 hover:bg-indigo-600'
                >
                  <span className='hidden sm:inline text-sm text-white '>포스트</span>
                  <DocumentPlusIcon className='h-5 w-5 text-white' aria-hidden='true' />
                </button>
              ) : keywordSearching || router.query.tag ? null : (
                <Link href='/login'>
                  <button
                    type='button'
                    className=' flex h-10 gap-1.5 px-2 items-center justify-center rounded-lg bg-indigo-500 hover:bg-indigo-600'
                  >
                    <span className='hidden sm:inline text-sm text-white '>포스트</span>
                    <DocumentPlusIcon className='h-5 w-5 text-white' aria-hidden='true' />
                  </button>
                </Link>
              )}
            </div>
          </div>

          <div className='my-4 px-5 flex justify-between items-center'>
            <div>
              {keywordSearching ? ( // eslint-disable-line no-nested-ternary
                <>
                  <span className='font-bold mr-0.5 '>{mainPosts.length}</span>
                  개의 포스트가 있습니다.
                </>
              ) : router.query.tag ? (
                <>
                  <span className='font-bold mr-0.5 '>{mainPosts.length}</span>
                  개의 포스트가 있습니다.
                </>
              ) : null}
            </div>
            <div className='flex py-1  bg-white rounded-md ring-1 ring-slate-200 hover:ring-indigo-500 duration-150 '>
              <form className='flex h-8 p-1' onSubmit={handleSubmit(onSearchPosts)}>
                <label htmlFor='keyword' />
                <input
                  id='keyword'
                  className='p-2 w-20 md:w-36 text-sm h-full outline-none bg-white placeholder:text-sm placeholder:text-slate-300 flex-1 text-slate-600 focus:bg-white focus:ring-0 rounded-md  sm:text-sm'
                  placeholder='포스트 검색'
                  {...register('keyword', {})}
                />
                <button type='submit'>
                  <MagnifyingGlassIcon className='w-6 cursor-pointer hover:text-indigo-500 hover:scale-105 mr-2 ml-1' />
                </button>
              </form>
            </div>
          </div>

          <div className='px-2 md:px-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4'>
            {mainPosts.map((post) => (
              <PostSection
                key={post.id}
                post={post}
                detailed={false}
                squareKind={squareKind}
                onTogglePostForm={onTogglePostForm}
              />
            ))}

            {loadPostsLoading && (
              <>
                <PostLoading />
                <PostLoading />
                <PostLoading />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SquareHeader;
