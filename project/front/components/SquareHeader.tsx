import {
  ArrowUturnLeftIcon,
  BoltIcon,
  DocumentPlusIcon,
  MagnifyingGlassIcon,
  QuestionMarkCircleIcon,
} from '@heroicons/react/20/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useInView } from 'react-intersection-observer';
import NewPostForm from './NewPostForm';
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
  const dispatch = useAppDispatch();
  const { me } = useAppSelector((state) => state.user);
  const [togglePostForm, setTogglePostForm] = useState(false);

  const { mainPosts, loadMorePosts, loadPostsLoading } = useAppSelector((state) => state.post);
  const [keywordSearching, setKeywordSearching] = useState(false);
  const router = useRouter();
  const [postLoadRef, inView] = useInView();

  const [searchKeyword, setSearchKeyword] = useState('');
  const { tag } = router.query;

  interface SearchPostValues {
    keyword: string;
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SearchPostValues>({
    mode: 'onSubmit',
  });

  useEffect(() => {
    if (inView && loadMorePosts && !loadPostsLoading && !tag && !keywordSearching) {
      // 일반 로드
      const lastPostId = mainPosts[mainPosts.length - 1]?.id;
      dispatch(loadPosts({ lastPostId, postUnique: squareKind }));
    }
    if (inView && loadMorePosts && !loadPostsLoading && tag && !keywordSearching) {
      // 해시태그 포스트 로드
      const lastPostId = mainPosts[mainPosts.length - 1]?.id;
      dispatch(
        loadPostsByHashtag({
          lastPostId,
          tag: tag as string,
        }),
      );
    }
    if (inView && loadMorePosts && !loadPostsLoading && !tag && keywordSearching) {
      // 검색 포스트 로드
      const lastPostId = mainPosts[mainPosts.length - 1]?.id;
      dispatch(loadPostsByKeyword({ keyword: searchKeyword, lastPostId }));
    }
  }, [
    inView,
    loadMorePosts,
    dispatch,
    searchKeyword,
    keywordSearching,
    loadPostsLoading,
    mainPosts,
    tag,
    squareKind,
  ]);

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
          <h1 className='px-2 md:px-6 text-base font-semibold leading-6 text-indigo-500'>
            {keywordSearching ? '어떤 포스트를 찾으시나요?' : squareSubTitle}
          </h1>
          <div className='px-1 md:px-5 h-10  flex justify-between items-center'>
            <button
              type='button'
              onClick={onRefresh}
              className='cursor-pointer relative flex items-center font-bold left-1'
            >
              <h1 className=' text-2xl font-bold tracking-tight  sm:text-3xl'>
                {keywordSearching ? `# ${searchKeyword}` : squareTitle}
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
              ) : keywordSearching ? ( // eslint-disable-line no-nested-ternary
                <span>
                  <span className='font-bold mr-0.5 '>{mainPosts.length}</span>개의 포스트가 있습니다.
                </span>
              ) : router.query.tag ? (
                <span>
                  <span className='font-bold mr-0.5 '>{mainPosts.length}</span>개의 포스트가 있습니다.
                </span>
              ) : (
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

          <div className='my-4 mb-8 px-2 md:px-5 w-full mx-auto flex flex-col md:flex-row justify-between items-center z-10 '>
            <div className='flex p-1 w-full justify-evenly gap-2'>
              <div className='flex l-2 w-1/3 py-1  bg-white rounded-lg ring-1 ring-slate-200 hover:ring-indigo-500 duration-150 '>
                <div className='px-2 flex  h-8 p-1 items-center'>
                  <div className='flex'>
                    <BoltIcon className='w-5 animate-ping text-indigo-300' />
                    <BoltIcon className='w-5 absolute text-indigo-500' />
                  </div>
                  <span className='ml-0.5 text-indigo-500 font-semibold tracking-tighter text-sm'>56</span>
                  <div className='ml-2 text-sm text-ellipsis line-clamp-1'>
                    제목제adawdqw목제목제목제목제목
                  </div>
                </div>
              </div>
              <div className='w-1/3  flex py-1  bg-white rounded-lg ring-1 ring-slate-200 hover:ring-indigo-500 duration-150 '>
                <div className='px-2.5 flex  h-8 p-1 items-center'>
                  <div className='flex'>
                    <BoltIcon className='w-5 animate-ping text-indigo-300' />
                    <BoltIcon className='w-5 absolute text-indigo-500' />
                  </div>
                  <span className='ml-0.5 text-indigo-500 font-semibold tracking-tighter text-sm'>56</span>
                  <div className='ml-2 text-sm text-ellipsis line-clamp-1'>
                    제목제adawdqw목제목제목제목제목
                  </div>
                </div>
              </div>
              <div className='w-1/3  flex py-1  bg-white rounded-lg ring-1 ring-slate-200 hover:ring-indigo-500 duration-150 '>
                <div className='px-2.5 flex  h-8 p-1 items-center'>
                  <div className='flex'>
                    <QuestionMarkCircleIcon className='w-5 animate-ping text-red-200' />
                    <QuestionMarkCircleIcon className='w-5 absolute text-red-400' />
                  </div>

                  <div className='ml-2 text-sm text-ellipsis line-clamp-1'>
                    제목제adawdqw목제목제목제목제목
                  </div>
                </div>
              </div>
            </div>
            <div className='w-full md:w-1/4 md:ml-10 my-1.5 md:my-0 flex py-1  bg-white rounded-lg ring-1 ring-slate-200 hover:ring-indigo-500 duration-150 '>
              <form className=' flex w-full justify-between h-8 p-1' onSubmit={handleSubmit(onSearchPosts)}>
                <label htmlFor='keyword' />
                <input
                  id='keyword'
                  className='p-2 w-full  text-sm h-full outline-none bg-white placeholder:text-sm placeholder:text-slate-300 flex-1 text-slate-600 focus:bg-white focus:ring-0 rounded-md  sm:text-sm'
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

      <div ref={postLoadRef} className='mt-10 text-center text-sm leading-6 text-slate-500'>
        포스트를 모두 로드했습니다
      </div>
    </>
  );
};

export default SquareHeader;
