import { useRef, useState, useEffect } from 'react'

const ProjectImages = () => {
    const [isMobile, setIsMobile] = useState(false);

    const item = useRef<HTMLDivElement>(null);
    const handleMouseEnter = () => {
        document.body.classList.add('overflow-hidden');
    }
    const handleMouseLeave = () => {
        document.body.classList.remove('overflow-hidden');
    }

    const handleFocus = () => {
        console.log("Element focused")
    }

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div ref={item} className={`carousel carousel-vertical hover ${!isMobile && "cursor-n-resize"} rounded-box h-56 flex flex-col bg-slate-200`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleFocus}
        >
            {isMobile ? (
                <img
                    className="carousel-item h-full w-full object-cover object-top transition-all duration-1000"
                    src='./ecommerce/ecommerce1.jpg'
                    alt="Mobile View"
                />
            ) : (
                <>
                    <img
                        className="carousel-item h-full w-full object-cover object-top transition-all duration-1000"
                        src='./ecommerce/ecommerce1.jpg'
                        alt=""
                    />
                    <img
                        className="carousel-item h-full w-full object-cover object-top transition-all duration-1000"
                        src='./ecommerce/ecommerce2.jpg'
                        alt=""
                    />
                    <img
                        className="carousel-item h-full w-full object-cover object-top transition-all duration-1000"
                        src='./ecommerce/ecommerce3.jpg'
                        alt=""
                    />
                    <img
                        className="carousel-item h-full w-full object-cover object-top transition-all duration-1000"
                        src='./ecommerce/ecommerce4.jpg'
                        alt=""
                    />
                </>
            )}
        </div>
    )
}

export default ProjectImages