const getUserClass = (cls: string) => {
  switch (cls) {
    case 'fedev':
      return '프론트엔드';
    case 'bedev':
      return '백엔드';
    case 'design':
      return '디자인';
    case 'plan':
      return '기획';
    default:
      return '일반';
  }
};

export default getUserClass;
