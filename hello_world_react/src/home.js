import React from 'react';
import { useSpring, animated } from 'react-spring';

const Home = () => {
    const fadeIn = useSpring({
        from: { opacity: 0, transform: 'translateY(-20px)' },
        to: { opacity: 1, transform: 'translateY(0)' },
        config: { duration: 1000 },
    });

    const buttonHover = useSpring({
        from: { scale: 1 },
        to: { scale: 1.1 },
        config: { tension: 200, friction: 10 },
        reset: true,
    });

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <animated.h1 style={fadeIn}>Welcome to the Home Page</animated.h1>
            <animated.p style={fadeIn}>This is a simple React home page with animations.</animated.p>
            <animated.button
                style={{
                    padding: '10px 20px',
                    marginTop: '20px',
                    cursor: 'pointer',
                    ...buttonHover,
                }}
            >
                Click Me
            </animated.button>
        </div>
    );
};

export default Home;