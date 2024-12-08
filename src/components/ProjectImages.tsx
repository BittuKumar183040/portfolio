import { useRef, useState, useEffect } from 'react'

interface ProjectImages {
    location: any;
    multiple: boolean | undefined
}

const ProjectImages : React.FC<ProjectImages> =  ({location, multiple}) => {
    const isMobile = multiple === true ? false : window.innerWidth < 768;
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
                const img1 = (await import(location[0])).default;
                setImages([img1]);
            } else {
                const images = await Promise.all(location.map( async (loc: any) => {
                    const img = await import(loc);
                    return img.default
                }))
                setImages(images);
            }
        };
        loadImages();
    }, []);

    return (
        <div ref={item} className={`carousel select-none carousel-vertical hover ${isMobile ? "cursor-pointer" : "cursor-n-resize"} rounded-box h-56 flex flex-col bg-slate-200`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocus={handleFocus}
        >
            {images.map((src, index) => (
                <img
                    key={index}
                    className="carousel-item h-full w-full object-cover object-top pointer-events-none"
                    src={src}
                    alt={`Slide ${index + 1}`}
                    loading="lazy"
                />
            ))}
        </div>
    )
}

export default ProjectImages