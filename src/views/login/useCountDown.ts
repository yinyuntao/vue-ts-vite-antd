import { ref, unref } from 'vue';

export function useCountDown(count: number = 60) {
  //当前显示的数字倒计时 单位s
  const currentCount = ref(count);

  const isStart = ref(false);
  let timerId: ReturnType<typeof setInterval> | null;

  function clear() {
    timerId && window.clearInterval(timerId);
  }

  function stop() {
    isStart.value = false;
    clear();
    timerId = null;
  }

  function start() {
    //对于null,undefined !会得到true的结果
    if (unref(isStart) || !!timerId) {
      return;
    }
    isStart.value = true;
    timerId = setInterval(() => {
      if (unref(currentCount) === 1) {
        stop();
        currentCount.value = count;
      } else {
        currentCount.value -= 1;
      }
    }, 1000);
  }

  function reset() {
    currentCount.value = count;
    stop();
  }

  function restart() {
    reset();
    start();
  }

  return { start, reset, restart, clear, stop, currentCount, isStart };
}
