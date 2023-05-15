const getUserBorderColor = (userClass: string | undefined) => {
  switch (userClass) {
    case 'fedev':
      return 'border-amber-400';
    case 'bedev':
      return 'border-emerald-400';
    case 'design':
      return 'border-red-400';
    case 'plan':
      return 'border-sky-300';
    default:
      return 'border-slate-400';
  }
};

export default getUserBorderColor;
