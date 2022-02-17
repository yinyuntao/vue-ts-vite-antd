const prefixName = 'vite-project';

export function useDesign(scope: string) {
  return {
    prefixCls: `${prefixName}-${scope}`,
    prefixVar: prefixName,
  };
}
