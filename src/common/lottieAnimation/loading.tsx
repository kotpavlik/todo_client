import { useLottie } from 'lottie-react';
import loading from './robo_loading.json'
import { CSSProperties } from 'react';


const style: CSSProperties = {
    overflow: 'hidden',
    borderRadius: 100,
    width: 250,
    height: 250,
    margin: '0 auto'
};
export const Loading = () => {
    const options = {
        animationData: loading,
        loop: true,
        autoplay: true,
    }

    const { View } = useLottie(options, style);

    return View;
}