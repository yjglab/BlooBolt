const getUserClassColor = (userClass: string | undefined) => {
  switch (userClass) {
    case 'fedev':
      return 'amber-400';
    case 'bedev':
      return 'emerald-400';
    case 'design':
      return 'red-400';
    case 'plan':
      return 'sky-300';
    default:
      return 'slate-400';
  }
};

export default getUserClassColor;
