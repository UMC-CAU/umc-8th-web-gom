// useThrottle: 주어진 값(상태)가 자주 변경될 때
// 최소 interval(밀리초) 간격으로만 업데이트해서 성능을 개선한다.

import { useEffect, useRef, useState } from 'react'

export default function useThrottle<T>(value: T, delay = 500) {
    // 최종적으로 외부에 노출할, 쓰로틀링 적용된 값 -> 렌더링될 값
    const [throttledValue, setThrottledValue] = useState<T>(value)

    // 타임 스탬프 용도
    const lastExecuted = useRef<number>(Date.now())

    useEffect(() => {
        if (Date.now() >= lastExecuted.current + delay) {
            // 충분한 시간이 지났으면 바로 업데이트
            lastExecuted.current = Date.now()
            setThrottledValue(value) // ✅ 리렌더링
        } else {
            // 충분한 시간이 지나지 않은 경우, delay 후 업데이트 예약
            const timerId = setTimeout(() => {
                lastExecuted.current = Date.now()
                setThrottledValue(value) // ✅ 리렌더링
            }, delay)

            // ⭐ 만약 그 사이에 value가 또 바뀌면
            // 이 useEffect가 다시 실행되고,
            // 이전 타이머는 clearTimeout으로 취소됨
            return () => clearTimeout(timerId)
        }
    }, [value, delay])

    return throttledValue
}
