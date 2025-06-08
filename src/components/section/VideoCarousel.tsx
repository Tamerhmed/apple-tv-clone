import { useMemo, useRef, useState } from 'react';
import { movies, randomMoviesSet1, randomMoviesSet2 } from '../../movies';
import {
  useScroll,
  useTransform,
  motion,
  useMotionValueEvent,
} from 'framer-motion';
import { useWindowSize } from 'react-use';
import Button from '../Button';

type Movie = {
  poster: string;
  name: string;
};

export default function VideoCarousel() {
  const [carouselVariant, setCarouselVariant] = useState<'active' | 'inactive'>(
    'inactive'
  );
  const { width, height } = useWindowSize();
  const videoCarouselRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: videoCarouselRef,
    offset: ['start start', 'end start'],
  });

  const maximumScale = useMemo(() => {
    const windowYRatio = height / width;
    const xScale = 1.66667;
    const yScale = xScale * (16 / 9) * windowYRatio;
    return Math.max(xScale, yScale);
  }, [width, height]);

  const scale = useTransform(
    scrollYProgress,
    [0.3, 0.5, 0.66],
    [maximumScale * 1.1, maximumScale, 1]
  );
  const posterOpacity = useTransform(scrollYProgress, [0.64, 0.66], [0, 1]);
  const posterTranslateXLeft = useTransform(
    scrollYProgress,
    [0.64, 0.66],
    [-20, 0]
  );
  const posterTranslateXRight = useTransform(
    scrollYProgress,
    [0.64, 0.66],
    [20, 0]
  );

  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    if (progress >= 0.67) {
      setCarouselVariant('active');
    } else {
      setCarouselVariant('inactive');
    }
  });
  return (
    <motion.div
      animate={carouselVariant}
      className='bg-backgroundContrast pb-16'
    >
      <div
        className='mt-[-100vh]  h-[300vh] overflow-clip'
        ref={videoCarouselRef}
      >
        <div className='sticky h-screen top-0 flex items-center'>
          <div className='relative flex gap-5 mb-5 left-1/2 -translate-x-1/2'>
            <motion.div
              style={{ opacity: posterOpacity, x: posterTranslateXLeft }}
              className='hidden sm:block aspect-[9/16] md:aspect-video shrink-0 w-[300px] sm:w-[60vw] rounded-2xl overflow-clip'
            >
              <img
                src={movies[0].poster}
                alt={movies[0].name}
                className='w-full h-full object-center'
              />
            </motion.div>
            <motion.div
              style={{ scale: width >= 769 ? scale : 1 }}
              className='relative aspect-[9/16] md:aspect-video shrink-0 w-full sm:w-[60vw] rounded-2xl overflow-clip'
            >
              <img
                src={movies[1].poster}
                alt={movies[1].name}
                className='w-full h-full object-center'
              />
              <motion.div
                variants={{
                  active: { opacity: 1 },
                  inactive: { opacity: 0 },
                }}
                className='hidden sm:flex md:justify-between gap-4 md:gap-0 items-center text-white md:text-lg absolute left-0 bottom-0 w-full p-5'
              >
                <p>
                  <strong>Travel</strong> - There are thrill seekers
                </p>
                <Button size='small'>Stream now</Button>
              </motion.div>
            </motion.div>
            <motion.div
              style={{ opacity: posterOpacity, x: posterTranslateXRight }}
              className='aspect-[9/16] md:aspect-video shrink-0 w-[300px] sm:w-[60vw] rounded-2xl overflow-clip'
            >
              <img
                src={movies[2].poster}
                alt={movies[2].name}
                className='w-full h-full object-center'
              />
            </motion.div>
          </div>
        </div>
      </div>
      <motion.div
        variants={{
          active: { opacity: 1, y: 0 },
          inactive: { opacity: 1, y: 20 },
        }}
        transition={{ duration: 0.4 }}
        className='-mt-[calc((100vh-(300px*(16/9))/2)] md:-mt-[calc((100vh-(60vw*(9/16))/2)]  space-y-3 pt-5'
      >
        <SmallVideoCarousel movies={randomMoviesSet1} />
        <div className='[animate-duration] [--carousel-offset:-32px]'>
          <SmallVideoCarousel movies={randomMoviesSet2} />
        </div>
      </motion.div>
    </motion.div>
  );
}

const SmallVideoCarousel = ({ movies }: { movies: Movie[] }) => {
  return (
    <div className='overflow-clip'>
      <div className='animate-carousel-move relative left-[var(--carousel-offset,0px)] flex gap-3'>
        {movies.map((movie, index) => (
          <div
            className='aspect-video w-[40vw] shrink-0 md:w-[23vw]'
            key={`${movie.name}-${index}`}
          >
            <img
              className='h-full w-full rounded-xl object-cover'
              src={movie.poster}
              alt={movie.name}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
