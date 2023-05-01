const getNoticeModalColor = (type: number | null) => {
  switch (type) {
    case 1:
      return ['text-indigo-500', 'Success'];
    case 2:
      return ['text-red-600', 'Failed'];
    default:
      return ['text-slate-700', 'Notice'];
  }
};

export default getNoticeModalColor;
