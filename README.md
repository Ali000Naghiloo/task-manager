# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

  // -> اجباری و اختیاری و غیر فعال بودن فیلدها
  let allReqPermisionInput: boolean | undefined = undefined;
  let allDesPermisionInput: boolean | undefined = undefined;
  let allAbsentPerInput: boolean | undefined = undefined;
  if (!!stepsPermition) {
  find task to WF = Object?.values(stepsPermition)
  ?.filter((item) => idWF === idT)
  .some((item) => item?.name === name);

  allDesPermisionInput = Object?.values(stepsPermition)
  ?.filter((item) => {
  return item?.status === 1;
  })
  .some((item) => item?.name === name);
  allAbsentPerInput = Object?.values(stepsPermition)
  ?.filter((item) => item?.status === 4)
  .some((item) => item?.name === name);
  }

  useEffect(() => {
  if (stepsPermition) {
  const perFieldSteps = () => {
  if (allReqPermisionInput) {
  setisREQtest(true);
  } else {
  setisREQtest(false);
  }
  if (allDesPermisionInput) {
  setIsDisable(true);
  } else {
  setIsDisable(false);
  }
  if (allAbsentPerInput) {
  setIsAbsentField(true);
  } else {
  setIsAbsentField(false);
  }
  };
  perFieldSteps();
  }
  }, [stepsPermition]);
