import { useRef, useState, useEffect } from 'react'

const ProjectImages = () => {
    const isMobile = window.innerWidth < 768;
    const [images, setImages] = useState<string[]>([]);

    const item = useRef<HTMLDivElement>(null);
    const handleMouseEnter = () => {
        !isMobile && document.body.classList.add('overflow-hidden');
    }
    const handleMouseLeave = () => {
        !isMobile && document.body.classList.remove('overflow-hidden');
    }

    const handleFocus = () => {
        console.log("Element focused")
    }

    useEffect(() => {
        const loadImages = async () => {
            if (isMobile) {
                const img1 = (await import('../assets/ecommerce/ecommerce1.jpg')).default;
                setImages([img1]);
            } else {
                const img1 = (await import('../assets/ecommerce/ecommerce1.jpg')).default;
                const img2 = (await import('../assets/ecommerce/ecommerce2.jpg')).default;
                const img3 = (await import('../assets/ecommerce/ecommerce3.jpg')).default;
                const img4 = (await import('../assets/ecommerce/ecommerce4.jpg')).default;
                setImages([img1, img2, img3, img4]);
            }
        };
        loadImages();
    }, []);

    return (
        <div ref={item} className={`carousel carousel-vertical hover ${isMobile ? "cursor-pointer" : "cursor-n-resize"} rounded-box h-56 flex flex-col bg-slate-200`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleFocus}
        >
            {images.map((src, index) => (
                <img
                    key={index}
                    className="carousel-item h-full w-full object-cover object-top"
                    src={src}
                    alt={`Slide ${index + 1}`}
                    loading="lazy"
                />
            ))}
        </div>
    )
}

export default ProjectImages