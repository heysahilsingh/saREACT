// const waitAMoment = (func, delay: number) => {
//     let timerId: number;
//     return function (...args) {
//         clearTimeout(timerId);
//         timerId = setTimeout(() => {
//             func.apply(this, args);
//         }, delay);
//     };
// }
//

const waitAMoment = (func: (...args: never[]) => void, delay: number) => {
    let timerId: ReturnType<typeof setTimeout> | undefined;
    return function (this: never, ...args: never[]) {
        clearTimeout(timerId);
        timerId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}
    

export default waitAMoment