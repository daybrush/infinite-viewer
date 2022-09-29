import { OnDrag } from "gesto";
import { TINY_NUM } from "./consts";
import { AnimationOptions } from "./types";

export function measureSpeed(e: OnDrag) {
    const { deltaX, deltaY, datas } = e;
    const time = Date.now();
    const prevSpeed = datas.speed;

    if (!prevSpeed) {
        datas.speed = [0, 0];
        datas.time = time;
        return;
    }
    const dt = time - datas.time;
    datas.speed = [prevSpeed[0] / 2 + deltaX / dt, prevSpeed[1] / 2 + deltaY / dt];
}

export function getDuration(speed: number[], a: number) {
    const normalSpeed = Math.sqrt(speed[0] * speed[0] + speed[1] * speed[1]);

    return Math.abs(normalSpeed / a);
}
export function getDestPos(speed: number[], a: number) {
    const duration = getDuration(speed, a);

    return [
        -speed[0] / 2 * duration,
        -speed[1] / 2 * duration,
    ];
}
export function minmax(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
}

export function abs(v: number) {
    return Math.abs(v);
}

export function getRange(
    pos: number,
    margin: number,
    range: number[],
    threshold: number,
    isReal: boolean,
) {
    const min = isReal || isFinite(range[0])
        ? range[0]
        : Math.min(-1, Math.floor(pos / margin)) * margin - threshold;
    const max = isReal || isFinite(range[1])
        ? range[1]
        : Math.max(1, Math.ceil(pos / margin)) * margin + threshold;

    return [min, max];
}

export function throttle(value: number) {
    return Math.round(value / TINY_NUM) * TINY_NUM;
}


export function checkDefault<T>(value: T | undefined | null, defaultValue: T): T {
    return value != null ? value : defaultValue;
}



export function startAnimation(
    callback: (ratioDist: number) => void,
    timerCallback: (next: () => void) => void,
    options: AnimationOptions,
) {
    const duration = options.duration;
    const easing = options.easing || ((x: number) => 1 - Math.pow(1 - x, 3));
    const startTime = Date.now();
    let prevTime = startTime;

    const next = () => {
        const now = Date.now();
        let t = now - startTime;

        if (duration < t) {
            t = duration;
        }
        const ratio = easing(t / duration);
        const prevRatio = easing((prevTime - startTime) / duration);

        prevTime = now;

        callback(ratio - prevRatio);

        if (t >= duration) {
            return;
        }
        timerCallback(next);
    };
    timerCallback(next);
}
